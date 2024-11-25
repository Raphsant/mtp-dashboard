<script setup lang="ts">
import {format} from "date-fns";

const isOpen = ref(false)
const isBannerEdited = ref(false)
const date = ref(new Date())
const {data: serviceData, refresh: refreshServices} = await useLazyFetch('/api/services/list', {server: false})
const {data, refresh} = await useLazyFetch('/api/discounts/list', {server: false})
const {data: bannerData, refresh: bannerRefresh} = await useLazyFetch('/api/settings/list', {server: false})
const addedServices = ref([])

const editedTextForBanner = ref('')

const discountForm = ref({
  name: '',
  description: '',
  percentage: 0,
  validUntil: date.value,
  services: addedServices.value,
  isActive: false
})

async function createDiscount() {
  try {
    const discount = await $fetch('/api/discounts/add', {
      method: 'POST',
      body: {
        name: discountForm.value.name,
        description: discountForm.value.description,
        percentage: discountForm.value.percentage,
        validUntil: date.value,
        affectedServices: addedServices.value,
        isActive: discountForm.value.isActive
      }
    })
    await refresh();
    await refreshServices();
    addedServices.value = []
    isOpen.value = false
  } catch (e) {
    console.error(e.message)
  }

}

async function updateBanner() {
  try {
    const banner = await $fetch('/api/settings/add', {
      method: 'POST',
      body: {
        text: editedTextForBanner.value
      }
    })
    isBannerEdited.value = false
    await bannerRefresh();
  } catch (e) {
    console.error(e.message)
  }
}

async function deleteDiscount(_id) {
  try {
    await $fetch('/api/discounts/delete', {
      method: "DELETE",
      body: {
        _id: _id
      }
    })
    await refresh();
    await refreshServices();
  } catch (e) {
    console.error(e.message)
  }
}


</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar>
        <template #title>
          <div class="justify-start items-center flex gap-2 text-primary text-lg">
            <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5"/>
            <span> Settings | Modify Discounts</span>
          </div>
        </template>
      </UDashboardNavbar>
      <UDashboardPanelContent class="p-0 pb-24 divide-y divide-gray-200 dark:divide-gray-800 max-w-[100rem]">
        <UDashboardSection class="px-4 py-6">
          <template #title>
            Your Discounts
          </template>
          <template #description>
            These are the discounts offered in the website
          </template>


          <UDashboardCard class="w-full" :ui="{ body: { base: ' dark:divide-gray-800 gap-4 flex flex-col' } }">
            <div>
              <UFormGroup>
                <template #label>
                  <span class="text-lg font-semibold text-primary">Promo banner displayed on the website</span>
                </template>
                <div class="flex justify-start items-center gap-4 w-full">
                  <UInput v-if="!isBannerEdited && bannerData" :disabled="!isBannerEdited" class="my-2 w-1/2"
                          :placeholder="bannerData.text"/>
                  <UInput v-if="isBannerEdited" class="my-2 w-1/2" v-model="editedTextForBanner"
                          :placeholder="bannerData.text"/>
                  <UIcon v-if="!isBannerEdited" @click="isBannerEdited = !isBannerEdited" class="w-6 h-6 cursor-pointer"
                         name="i-heroicons-pencil"/>
                  <UIcon v-if="isBannerEdited" @click.prevent="updateBanner" class="w-6 h-6 cursor-pointer"
                         name="i-heroicons-check"/>
                  <UIcon v-if="isBannerEdited" @click="isBannerEdited = false" class="w-6 h-6 cursor-pointer"
                         name="i-heroicons-x-circle"/>
                </div>
              </UFormGroup>
            </div>
            <UButton class="w-[7rem]" block label="New Discount" @click="isOpen = true"/>
            <div class="w-full flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
              <UDashboardCard class=" w-full h-auto flex flex-col justify-between" v-for="discount in data">
                <template #title>
                <span class="text-primary text-xl font-bold">
                {{ discount.name }} - {{ discount.percentage }} % - <span
                    class="text-primary font-bold text-lg">{{ discount.isActive ? "Active" : "Inactive" }}</span>
                </span>
                </template>
                <template #description>
                  {{ discount.description }} - Valid until: {{ discount.validUntil }}
                </template>
                <template #default>
                  <div class="flex flex-col justify-center items-center gap-4">
                    <div class="dark:text-gray-300 text-md font-semibold">
                      Affected Services
                    </div>
                    <div
                        class="flex flex-col gap-8  w-full justify-center items-center place-content-center place-items-center">
                      <div v-for="data in discount.affectedServices">
                        <span
                            class=" border-primary border px-2 py-2 rounded">{{ data.name }}
                {{ data.rims?.min && data.rims?.max ? `(${data.rims?.min} - ${data.rims?.max})" rims` : "" }}</span>
                      </div>
                    </div>
                  </div>
                </template>
                <template #footer>
                  <UButton @click="deleteDiscount(discount._id)" label="Remove discount"/>
                </template>

              </UDashboardCard>

            </div>
          </UDashboardCard>
        </UDashboardSection>
      </UDashboardPanelContent>
    </UDashboardPanel>
    <UDashboardModal class="h-fit" v-model="isOpen" title="Add Discount">
      <div class="">
        <UCard>
          <div class="flex flex-col gap-4">
            <UFormGroup label="Discount name">
              <UInput v-model="discountForm.name"/>
            </UFormGroup>
            <UFormGroup label="Discount description">
              <UInput v-model="discountForm.description"/>
            </UFormGroup>
            <UFormGroup label="Discount amount">
              <UInput v-model="discountForm.percentage" type="number">
                <template #trailing>
                  <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
                </template>
              </UInput>
            </UFormGroup>
            <UFormGroup label="Valid Until">
              <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')"/>
                <template #panel="{ close }">
                  <DatePicker v-model="date" is-required @close="close"/>
                </template>
              </UPopover>
            </UFormGroup>
            <UFormGroup>
              <UCheckbox v-model="discountForm.isActive" label="Is Active?"/>
            </UFormGroup>
          </div>
        </UCard>
        <UCard>
          <div class="mb-4">Add Services to this Discount</div>
          <div class="flex flex-col gap-2">
            <div v-for="data in serviceData" :key="data._id">
              <UTooltip class="w-full" :text="data.discounts[0]?.isActive ? `This service already has a discount: ${data.discounts[0].name}` : null ">
                <div
                    @click="addedServices.includes(data._id) || data.discounts[0]?.isActive ? addedServices = addedServices.filter(item => item !== data._id) : addedServices.push(data._id)"
                    class="px-1 py-2 rounded w-full "
                    :class="[
  addedServices.includes(data._id) ? 'bg-red-700/90' : 'bg-red-900/30',
  data.discounts[0]?.isActive ? 'cursor-not-allowed text-gray-600' : 'cursor-pointer hover:bg-red-700/90'
]"

                >
                  {{ data.name }}
                  {{ data.rims?.min && data.rims?.max ? `(${data.rims?.min} - ${data.rims?.max})" rims` : "" }} -
                  ${{ data.price }}
                </div>
              </UTooltip>
            </div>
          </div>
          <template #footer>
            <UButton @click.prevent="createDiscount" block label="Create Discount"/>
          </template>
        </UCard>
      </div>
    </UDashboardModal>
  </UDashboardPage>
</template>

<style scoped>

</style>
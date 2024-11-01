<script setup lang="ts">
import {format} from "date-fns";

const isOpen = ref(false)
const date = ref(new Date())
const {data: serviceData} = await useLazyFetch('/api/services/list', {server: false})
const {data, refresh} = await useLazyFetch('/api/discounts/list', {server: false})
const addedServices = ref([])

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
    isOpen.value = false
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
            <UButton class="w-[7rem]" block label="New Discount" @click="isOpen = true"/>
            <div class="w-full flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
              <UDashboardCard class=" w-full" v-for="discount in data">
                <template #title>
                <span class="text-primary text-xl font-bold">
                {{ discount.name }} - {{ discount.percentage }} % - <span class="text-primary font-bold text-lg">{{ discount.isActive?  "Active" : "Inactive" }}</span>
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
              <div
                  @click="addedServices.includes(data._id) ? addedServices = addedServices.filter(item => item !== data._id) : addedServices.push(data._id)"
                  class="px-1 py-2 rounded cursor-pointer hover:bg-red-700/90"
                  :class="addedServices.includes(data._id) ? 'bg-red-700/90' : 'bg-red-900/30'"
              >
                {{ data.name }}
                {{ data.rims?.min && data.rims?.max ? `(${data.rims?.min} - ${data.rims?.max})" rims` : "" }} -
                ${{ data.price }}
              </div>
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
<script setup lang="ts">
const isAddSectionActive = ref(false)
const isDeleteOpen = ref(false)
const selectedServiceForEditing = ref(undefined)
const editedService = ref({
  name: '',
  rims: {
    min: 0,
    max: 0
  },
  time: '',
  price: 0,
  _id: ''
})
const newService = ref({
  name: '',
  rims: {
    min: 0,
    max: 0
  },
  time: '',
  price: 0,
  _id: ''
})

const deletedService = ref({
  name: '',
  rims: {
    min: 0,
    max: 0
  },
  time: '',
  price: 0,
  _id: ''
})

const {data, status, refresh} = useLazyFetch('/api/services/list', {server: false})

/**
 * Handles the process of editing a service.
 *
 * This function sets the selected service for editing by updating the selectedServiceForEditing
 * and editedService reactive properties. The `selectedServiceForEditing` property is set to the
 * provided index `n`, while the `editedService` property is populated with the details of the
 * provided `service`.
 *
 * @param {object} service - The service object to be edited. It contains properties such as name,
 *                           rims, price, time, and an identifier (_id).
 * @param {number} n - The index of the service to be edited in the list of services.
 */

const handleEditService = (service, n) => {
  selectedServiceForEditing.value = n
  editedService.value = {
    name: service.name,
    rims: {
      min: service.rims?.min,
      max: service.rims?.max
    },
    price: service.price,
    time: service.time,
    _id: service._id
  }
}

/**
 * Opens the delete confirmation dialog and populates the `deletedService` state with the provided service data.
 *
 * @param {Object} service - The service object to be deleted.
 * @param {string} service.name - The name of the service.
 * @param {Object} service.rims - The rims details of the service.
 * @param {number} service.rims.min - The minimum rims value.
 * @param {number} service.rims.max - The maximum rims value.
 * @param {number} service.price - The price of the service.
 * @param {number} service.time - The time required for the service.
 * @param {string} service._id - The unique identifier of the service.
 */
const handleDeleteService = (service) => {
  isDeleteOpen.value = true
  deletedService.value = {
    name: service.name,
    rims: {
      min: service.rims?.min,
      max: service.rims?.max
    },
    price: service.price,
    time: service.time,
    _id: service._id
  }
}
/**
 * Submits the edited service data to the server.
 * This function sends a POST request to the '/api/services/edit' endpoint with the edited service information.
 * If the submission is successful, the edited service information is reset and the service list is refreshed.
 * If an error occurs during the submission, it logs the error message to the console.
 *
 * @async
 */

const submitEditService = async () => {
  try {
    const serviceData = await $fetch('/api/services/edit', {
      body: JSON.stringify(editedService.value),
      method: 'POST',
    })
    selectedServiceForEditing.value = undefined
    await refresh();
  } catch (e) {
    console.error(e.message)
  }
}
/**
 * Submits a new service to the server and updates the view accordingly.
 *
 * This asynchronous function performs the following actions:
 * - Sends a POST request with the new service data to the server.
 * - Disables the "add section" UI component upon successful submission.
 * - Refreshes the view to reflect the newly added service.
 *
 * At any point, if an error occurs, it logs the error message to the console.
 *
 * @async
 */
const submitAddService = async () => {
  try {
    const serviceData = await $fetch('/api/services/add', {
      body: JSON.stringify(newService.value),
      method: 'POST',
    })
    isAddSectionActive.value = false
    await refresh();
  } catch (e) {
    console.error(e.message)
  }
}
/**
 * Asynchronously submits a request to delete a service identified by its ID.
 *
 * @param {string} _id - The unique identifier of the service to delete.
 * @throws Will log an error message if the deletion request fails.
 */

const submitDeleteService = async (_id) => {
  try {
    const deletion = await $fetch('/api/services/remove', {
      body: {_id},
      method: "DELETE"
    })
    isDeleteOpen.value = false
    await refresh();
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
            <span> Settings | Modify Services</span>
          </div>
        </template>
      </UDashboardNavbar>
      <UDashboardPanelContent class="p-0 pb-24 divide-y divide-gray-200 dark:divide-gray-800">
        <UDashboardSection class="px-4 py-6">
          <template #title>
            Your Services
          </template>
          <template #description>
            These are the services offered in the website
          </template>
          <UCard class="w-full" :ui="{ body: { base: ' dark:divide-gray-800 gap-4 flex flex-col' } }">
            <div class="flex justify-start items-center w-full gap-4" v-for="(service, index) in data">
              <!--              Edit section-->
              <div v-if="selectedServiceForEditing == index" class="flex gap-4 w-full">
                <UFormGroup class="w-full" label="Name">
                  <UInput v-model="editedService.name" class="w-full"/>
                </UFormGroup>
                <UFormGroup class="w-fit" label="Price">
                  <UInput v-model="editedService.price" class="w-full"/>
                </UFormGroup>
                <UFormGroup class="w-fit" label="Time">
                  <UInput v-model="editedService.time" class="w-full"/>
                </UFormGroup>
                <UFormGroup label="Rim Sizes" class="">
                  <div class="flex justify-center items-center gap-2">
                    <UInput v-model="editedService.rims.min" placeholder="Min Rim Size" type="number"></UInput>
                    <UInput v-model="editedService.rims.max" placeholder="Max Rim Size" type="number"></UInput>
                  </div>
                </UFormGroup>
              </div>
              <!--              Display Existing services-->
              <UInput v-if="selectedServiceForEditing != index" :disabled="selectedServiceForEditing != index"
                      :placeholder='`${service.name} ${service.rims?.min && service.rims?.max ? `(${service.rims?.min} - ${service.rims?.max})" rims` : ""   }`'
                      class="w-full"/>
              <UInput v-if="selectedServiceForEditing != index" :disabled="selectedServiceForEditing != index"
                      :placeholder='`$${service.price}`'
                      class="w-fit"/>
              <UInput v-if="selectedServiceForEditing != index" :disabled="selectedServiceForEditing != index"
                      :placeholder='`${service.time} mins`'
                      class="w-fit"/>

              <!--              Icons to enable editing, saving, canceling, deleting-->
              <UIcon v-if="selectedServiceForEditing != index" @click="handleEditService(service, index)"
                     name="i-heroicons-pencil"
                     class="w-8 h-8 text-black dark:text-white cursor-pointer"/>
              <UIcon @click.prevent="handleDeleteService(service)" v-if="selectedServiceForEditing != index"
                     name="i-heroicons-minus-circle"
                     class="w-8 h-8 text-black dark:text-primary"/>
              <UIcon @click="submitEditService" v-if="selectedServiceForEditing == index" name="i-heroicons-check"
                     class="w-8 h-8 text-black dark:text-green-500"/>
              <UIcon @click="selectedServiceForEditing = undefined" v-if="selectedServiceForEditing == index"
                     name="i-heroicons-x-mark" class="w-8 h-8 text-black dark:text-primary"/>
            </div>
            <!--            New service section-->
            <div v-if="isAddSectionActive" class="flex gap-4 w-full">
              <UFormGroup class="w-full" label="Name">
                <UInput v-model="newService.name" class="w-full"/>
              </UFormGroup>
              <UFormGroup label="Price">
                <UInput v-model="newService.price" class="w-fit">
                  <template #trailing>
                    <span class="text-gray-500 dark:text-gray-400 text-xs">USD</span>
                  </template>
                </UInput>
              </UFormGroup>
              <UFormGroup label="Time">
                <UInput v-model="newService.time" class="w-fit">
                  <template #trailing>
                    <span class="text-gray-500 dark:text-gray-400 text-xs">Mins</span>
                  </template>
                </UInput>
              </UFormGroup>
              <UFormGroup label="Rim Sizes" class="">
                <div class="flex justify-center items-center gap-2">
                  <UInput v-model="newService.rims.min" placeholder="Min Rim Size" type="number"></UInput>
                  <UInput v-model="newService.rims.max" placeholder="Max Rim Size" type="number"></UInput>
                </div>
              </UFormGroup>
            </div>
            <!--            Buttons for adding, saving, cancelling-->
            <UButton v-if="!isAddSectionActive" @click="isAddSectionActive = !isAddSectionActive"
                     class="w-1/4 text-center" block label="Add New Service"/>
            <div v-if="isAddSectionActive" class="flex justify-start items-center gap-4">
              <UButton @click.prevent="submitAddService" class="w-1/6 text-center" color="emerald" block label="Save"/>
              <UButton @click="isAddSectionActive = false" class="w-1/6 text-center" block label="Cancel"/>
            </div>
          </UCard>
        </UDashboardSection>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
  <UDashboardModal
      v-model="isDeleteOpen"
      :title='`Delete Service - ${deletedService.name} ${deletedService.rims?.min && deletedService.rims?.max ? `(${deletedService.rims?.min} - ${deletedService.rims?.max})" rims` : ""   }`'
      description="Are you sure you want to delete this service? This can't be undone"
      icon="i-heroicons-exclamation-circle"
      :ui="{
      icon: { base: 'text-red-500 dark:text-red-400' } as any,
      footer: { base: 'ml-16' } as any
    }"
  >
    <template #footer>
      <UButton color="red" label="Delete" :loading="loading" @click.prevent="submitDeleteService(deletedService._id)"/>
      <UButton color="white" label="Cancel" @click="isDeleteOpen = false"/>
    </template>
  </UDashboardModal>
</template>


<style scoped>

</style>
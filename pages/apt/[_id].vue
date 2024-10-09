<script setup lang="ts">
import moment from "moment-timezone";

const route = useRoute();
const toast = useToast();
const data = ref('')

const {status, data: apt} = await useFetch(`/api/apts/apt`, {
  query: {id: route.params._id},
  onResponse({response}) {
    data.value = response._data;
  },
})


const modifyStatus = async (status) => {
  const newApt = await $fetch(`/api/apts/modify`, {
    method: 'POST',
    body: {id: route.params._id, status, email: data.value.userId.email}
  })
  data.value = await newApt.newApt

}

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Appointment">

      </UDashboardNavbar>
      <UDashboardPanelContent >
        <div class="flex flex-col gap-6">
          <div class="grid lg:grid-cols-2 gap-4 mt-4">
            <UDashboardCard>

              <template #default>
                <div>
                  <span class="font-semibold text-primary">Address:</span> {{ data?.address }}
                </div>
                <div>
                  <span class="font-semibold text-primary">Date:</span>
                  {{ moment(data?.appointmentDate).format('MMMM Do YYYY, h:mm A') }}
                </div>
                <div>
                  <span class="font-semibold text-primary">Phone:</span> {{ data?.phone }}
                </div>
              </template>
              <template #title>
                <div class="text-2xl text-primary">
                  {{ data?.service }} TPM: {{ data?.tpm }}
                </div>
              </template>

            </UDashboardCard>
            <UDashboardCard>
              <template #title>
                <div class="text-2xl text-primary">
                  <UIcon name="i-heroicons-user-solid" class="text-center"/>
                  <span class="text-2xl text-primary">
                Customer Information
              </span>
                </div>
              </template>
              <template #default>
                <div>
                  <div>
                    <span class="font-semibold text-primary">Name:</span> {{ data?.userId.name }}
                  </div>
                  <div>
                    <span class="font-semibold text-primary">Email:</span> {{ data?.userId.email }}
                  </div>
                  <div>
                    <span class="font-semibold text-primary">Car:</span> {{ data?.carId.year }} {{
                      data?.carId.make
                    }}
                    {{ data?.carId.model }}
                  </div>
                </div>
              </template>
            </UDashboardCard>
          </div>
          <div>
            <UDashboardCard>
              <template #title>
                <div class="text-2xl text-primary text-center w-full flex gap-2">
                  <UIcon name="i-heroicons-information-circle" class="text-center"/>
                  <span>Actions</span>
                </div>
              </template>
              <template #description>
                <div>These actions will notify the client</div>
              </template>
              <template #default>
                <div class="flex justify-center items-center w-full">
                  <div class="flex flex-col  gap-2 w-1/3 text-center">
                    <UButton
                        @click="modifyStatus(data?.status === 'Confirmed' ? 'Completed' : 'Confirmed')"
                        block
                        icon="i-heroicons-check"
                        size="xl"
                        :color="data?.status === 'Completed' ? 'green' : 'green'"
                        :label="data?.status === 'Confirmed' ? 'Finish Appointment' : data?.status === 'Completed' ? 'Appointment Completed' : 'Confirm Appointment '"
                        :variant="data?.status === 'Completed' ? 'outline' : 'solid'"
                        :disabled="data?.status === 'Completed'"
                    />
                    <UButton
                        :disabled="data?.status === 'Cancelled' || data?.status === 'Completed'"
                        :variant="data?.status === 'Cancelled' ? 'outline' : 'Completed' ? 'outline' : 'solid'"
                        block
                        icon="i-heroicons-x-circle"
                        size="xl"
                        :label="data?.status === 'Cancelled' ? 'Appointment Cancelled' : 'Cancel Appointment'"
                    />
                    <!--                    <UButton @click="modifyStatus('Confirmed')" block size="xl" color="orange" label="Delete"/>-->
                    <UButton icon="i-heroicons-clock" @click="modifyStatus('Pending')" block size="xl" color="gray"
                             label="Pending"/>
                  </div>
                </div>
              </template>
            </UDashboardCard>
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>
<script setup lang="ts">
import moment from "moment-timezone";

const {status, data} = await useLazyFetch('/api/apts/all', {server: false})
watch(data, (newData) => {

})


const columns = [
  {
    key: 'actions',
  },
  {
    key: 'userId.name',
    label: 'Customer',
  },
  {
    key: 'appointmentDate',
    label: 'Appointment Date'
  },
  {
    key: 'service',
    label: 'Service',
  },
  {
    key: 'carId.make',
    label: 'Vehicle',
  },
  {
    key: 'status',
    label: 'Status',
  }
]

</script>




<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Appointments">
        <template #right>
          <UInput
              ref="input"
              icon="i-heroicons-funnel"
              autocomplete="off"
              placeholder="Filter users..."
              class="hidden lg:block"
              @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/"/>
            </template>
          </UInput>
        </template>
      </UDashboardNavbar>
      <UTable v-if="status==='success'" :loading="status === 'pending'" :rows="data" :columns="columns">
        <template #actions-data="{row}">
          <UButton @click="navigateTo(`/apt/${row._id}`)" label="Open" color="gray"  />
        </template>
        <template #status-data="{ row }">
          <UBadge
              :label="row.status"
              :color="row.status === 'Confirmed'  ? 'green' : row.status === 'Pending' ? 'orange' : row.status === 'Cancelled' ? 'red' : 'orange'"
              variant="subtle"
              class="capitalize"
          />
        </template>
        <template #carId.make-data="{ row }">
          <span>{{ row.carId.year }} {{ row.carId.make }} {{ row.carId.model }}</span>
        </template>
        <template #appointmentDate-data="{row}">
          <span>{{ moment(row.appointmentDate).format('MMMM Do YYYY, h:mm A') }}</span>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>
<script setup lang="ts">
import moment from "moment-timezone";

// const {status, data} = await useLazyFetch('/api/apts/all')
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

</template>

<style scoped>

</style>
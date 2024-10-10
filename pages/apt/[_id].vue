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

</template>

<style scoped>

</style>
<script setup lang="ts">
const greeting = computed(() => {
  const hour = new Date().getHours();
  return hour < 12
      ? "Good morning"
      : hour < 18
          ? "Good afternoon"
          : "Good evening";
});

const userData = ref('')


const {data} = await useFetch('/api/apts/count')
const {data: dashData} = await useLazyFetch(() => 'api/user/dashboard', {server: false})
watch(dashData, (newData) => {
  userData.value = newData
})

</script>

<template>

</template>

<style scoped>

</style>
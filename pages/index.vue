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
  <UDashboardPage>
    <UDashboardPanel grow>
      <ULandingHero>
        <template #title>
          <span class="text-primary">Mobile Tire Pro</span>
        </template>
        <template #description>
          {{ greeting }}, Brenden
        </template>
      </ULandingHero>
      <UDashboardPanelContent>
        <div class="grid md:grid-cols-2 gap-4 mt-4">
          <div class="space-y-6">
            <UDashboardCard>
              <template #icon>
                <UIcon class="w-10 h-10" name="i-heroicons-book-open"/>
              </template>
              <template #title><span class="text-primary">Recent Appointments</span></template>
              <template #description>You have {{ data.counts[1].count }}
                {{ data.counts[1].count === 1 ? "appointment" : "appointments" }} waiting for confirmation
              </template>
            </UDashboardCard>
            <UDashboardCard>
              <div class="flex flex-col justify-start items-center gap-4">
                <UProgress color="gray" :value="data.counts[1].count"
                           :max="data.counts[0].count + data.counts[1].count + data.counts[2].count">
                  <template #indicator>
                    <div class="text-right">
                      <span class="text-gray-300 text-xs">🕛 Pending appointments ({{ data.counts[1].count }})</span>

                    </div>
                  </template>
                </UProgress>
                <UProgress color="green" :value="data.counts[0].count"
                           :max="data.counts[0].count + data.counts[1].count + data.counts[2].count">
                  <template #indicator>
                    <div class="text-right">
                      <span class="text-xs">✅ Confirmed appointments ({{ data.counts[0].count }})</span>

                    </div>
                  </template>
                </UProgress>
                <UProgress color="red" :value="data.counts[2].count"
                           :max="data.counts[0].count + data.counts[1].count + data.counts[2].count">
                  <template #indicator>
                    <div class="text-right">
                      <span class="text-gray-300 text-xs">🚫 Cancelled appointments ({{ data.counts[2].count }}) </span>

                    </div>
                  </template>
                </UProgress>
              </div>
            </UDashboardCard>
          </div>
          <div class="space-y-6">
            <UDashboardCard name="i-heroicons-user">
              <template #title>
                Current Clients
              </template>
              <template #description>
                You have {{ userData.totalCount }} clients registered
              </template>
            </UDashboardCard>
            <UDashboardCard>
              <template #title>
                Recent registrations
              </template>
              <template #default>
                <div v-for="user in userData.lastFiveUsers" class="flex justify-start items-center gap-2 py-2">
                  <UAvatar :src="user.picture" :alt="user.name"/> <span class="text-sm">{{user.name}}</span>
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
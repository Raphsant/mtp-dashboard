<script setup lang="ts">

definePageMeta({
  middleware: "auth"
})


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
      <UDashboardNavbar>
        <template #title>
          <span class="text-primary">Home</span>
        </template>
      </UDashboardNavbar>

        <UDashboardPanelContent :ui="{wrapper: 'max-w-[120rem]'}">
          <ULandingHero>
            <template #title>
              <span class="text-primary">Mobile Tire Pro</span>
            </template>
            <template #description>
              {{ greeting }}, Brenden
            </template>
          </ULandingHero>
          <div class="w-full flex flex-col justify-center items-center  md:grid md:grid-cols-2 gap-4 mt-4">
            <UDashboardCard class="col-start-1 col-end-3" icon="i-heroicons-exclamation-triangle"
                            :ui="{ background: 'dark:bg-yellow-900/20', ring: 'dark:ring-amber-500' }">
              <template #title>
                Notices:
              </template>
              <template #description>
                - The next set of upcoming features will allow you to manage your services and discounts, also sending
                mass emails
              </template>
            </UDashboardCard>
            <div class="w-full space-y-6">
              <UDashboardCard :ui="{ background: 'bg-red-200/20', ring: 'ring-red-600' }">
                <template #icon>
                  <UIcon class="w-10 h-10" name="i-heroicons-book-open"/>
                </template>
                <template #title><span class="text-primary">Recent Appointments</span></template>
                <template #description><div v-if="data?.counts[0]?.count < 0">You have {{ data?.counts[1]?.count }}
                  {{ data?.counts[1]?.count === 1 ? "appointment" : "appointments" }} waiting for confirmation</div>
                  <div v-else>
                    You have no appointments waiting for confirmation.
                  </div>
                </template>
              </UDashboardCard>
              <UDashboardCard class="h-[21rem]" :ui="{ background: 'bg-red-200/20', ring: 'ring-red-600' }">
                <div class="flex flex-col justify-center items-center gap-4 h-[18.4rem]">
                  <UProgress color="gray" :value="data?.counts[1]?.count"
                             :max="data?.counts[0]?.count + data?.counts[1]?.count + data?.counts[2]?.count">
                    <template #indicator>
                      <div class="text-right">
                        <span class=" text-xs">🕛 Pending appointments ({{ data?.counts[1]?.count }})</span>

                      </div>
                    </template>
                  </UProgress>
                  <UProgress color="green" :value="data?.counts[0]?.count"
                             :max="data?.counts[0]?.count + data?.counts[1]?.count + data?.counts[2]?.count">
                    <template #indicator>
                      <div class="text-right">
                        <span class="text-xs">✅ Confirmed appointments ({{ data?.counts[0]?.count }})</span>

                      </div>
                    </template>
                  </UProgress>
                  <UProgress color="red" :value="data?.counts[2]?.count"
                             :max="data?.counts[0]?.count + data?.counts[1]?.count + data?.counts[2]?.count">
                    <template #indicator>
                      <div class="text-right">
                        <span class=" text-xs">🚫 Cancelled appointments ({{ data?.counts[2]?.count }}) </span>

                      </div>
                    </template>
                  </UProgress>
                </div>
              </UDashboardCard>
            </div>
            <div class="w-full space-y-6">
              <UDashboardCard name="i-heroicons-user" :ui="{ background: 'bg-red-200/20', ring: 'ring-red-600' }">
                <template #title>
                  Current Clients
                </template>
                <template #description>
                  You have {{ userData.totalCount }} clients registered
                </template>
              </UDashboardCard>
              <UDashboardCard class="h-[21rem]" :ui="{ background: 'bg-red-200/20', ring: 'ring-red-600' }">
                <template #title>
                  Recent registrations
                </template>
                <template #default>
                  <div v-for="user in userData.lastFiveUsers" class="flex justify-start items-center gap-2 py-2">
                    <UAvatar :src="user.picture" :alt="user.name"/>
                    <span class="text-sm">{{ user.name }}</span>
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
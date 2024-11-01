<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()


const links = [{
  id: 'home',
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'appointment',
  label: 'Appointments',
  icon: 'i-heroicons-inbox',
  to: '/appointments',
  tooltip: {
    text: 'Inbox',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'users',
  label: 'Customers Database',
  icon: 'i-heroicons-user-group',
  to: '/clients',
  tooltip: {
    text: 'Clients',
    shortcuts: ['G', 'U']
  }
}, {
  id: 'settings',
  label: 'Settings',
  to: '/settings',
  icon: 'i-heroicons-cog-8-tooth',
  children: [{
    label: ' Add/Modify Services',
    to: '/settings/services',
  }, {
    label: 'Discounts',
    to: '/settings/discounts'
  }, {
    label: 'Send mass emails',
    to: '/settings/notifications'
  }],
  tooltip: {
    text: 'Settings',
    shortcuts: ['G', 'S']
  }
}]

const footerLinks = [{
  label: 'TWA Support',
  icon: 'i-heroicons-question-mark-circle',
  click: () => isHelpSlideoverOpen.value = true
}]

const groups = [{
  key: 'links',
  label: 'Go to',
  commands: links.map(link => ({...link, shortcuts: link.tooltip?.shortcuts}))
}, {
  key: 'code',
  label: 'Code',
  // commands: [{
  //   id: 'source',
  //   label: 'View page source',
  //   icon: 'i-simple-icons-github',
  //   click: () => {
  //     window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank')
  //   }
  // }]
}]

</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
        :width="250"
        :resizable="{ min: 200, max: 300 }"
        collapsible
    >
      <UDashboardNavbar
          class="!border-transparent"
          :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <img src="~/assets/img/mtp.png" alt="mtp logo"/>

        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton/>
        </template>

        <UDashboardSidebarLinks :links="links"/>

        <UDivider/>


        <div class="flex-1"/>

        <UDashboardSidebarLinks :links="footerLinks"/>

        <UDivider class="sticky bottom-0"/>

        <template #footer>
          <div class="text-xs font-bold"><span class="text-red-600">The</span><span class="text-orange-600">Web</span><span class="text-orange-400">Agency</span></div>
          <!-- ~/components/UserDropdown.vue -->
          <UColorModeToggle />

        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot/>


    <ClientOnly>
      <LazyUDashboardSearch :groups="groups"/>
    </ClientOnly>
  </UDashboardLayout>
</template>
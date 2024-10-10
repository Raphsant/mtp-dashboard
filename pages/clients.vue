<script setup lang="ts">

import moment from "moment-timezone";

onBeforeMount(async () => {
  const {data} = await useLazyFetch('/api/user/list')

  watch(data, async (newData) => {
    users.value = newData
  })
})
const { metaSymbol } = useShortcuts();

defineShortcuts({
  meta_s: {
    handler: () => {
      inputBox.value?.input?.focus()
    }
  }
})

const inputBox = ref(null)
const users = ref([])
const filterText = ref('')

/**
 * A computed property that returns a filtered array of users based on the filter text.
 * If `filterText` is empty, it returns the original list of users.
 * Otherwise, it filters users whose names include the filter text, case-insensitively.
 *
 * Dependencies:
 * - `users` (reactive variable): The original list of users.
 * - `filterText` (reactive variable): The text used to filter the users.
 *
 * @type {array}
 */
const filteredUsers = computed(() => {
  if(!filterText.value){
    return users.value
  }
  return users.value.filter(user =>
      user.name.toString().toLowerCase().includes(filterText.value.toString().toLowerCase())
  )
})

/**
 * deleteUser is an asynchronous function that sends a DELETE request to the server
 * to remove a user with the specified _id.
 *
 * @param {string} _id - The unique identifier of the user to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted or
 *                            rejects if there is an error.
 *
 * @throws {Error} Will log any network or server errors encountered during the request.
 */

const toast = useToast();

const deleteUser = async (_id) => {
  try {
    const result = await $fetch('/api/user/delete', {
      method: 'DELETE',
      body: {_id}
    })
    users.value = await $fetch('api/user/list')
    toast.add({title: 'User eliminated successfully'})
  } catch (e) {
    console.error(e.message)
  }

}


const columns = [
  {
    key: 'name',
    label: "Client's Name"
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'cars',
    label: 'Cars'
  },
  {
    key: 'apts',
    label: 'Appointments made'
  }, {
    key: 'actions'
  }
]

const items = (row) => [
  [
    {
      label: 'Delete User',
      icon: 'i-heroicons-x-circle',
      click: () => deleteUser(row._id)
    }
  ]
]

const carList = [
  [{
    slot: 'car',
    disabled: true
  }]
]


</script>

<template>

</template>

<style scoped>

</style>
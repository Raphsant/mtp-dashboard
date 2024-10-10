<script setup lang="ts">
import { type CredentialResponse, decodeCredential } from "vue3-google-signin";

const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response;
  const data = decodeCredential(credential)
  await sendCredentialsToBackend(data)
};

const sendCredentialsToBackend = async (credentials: any) => {
  const user = $fetch('/api/auth/googleAuth', {
    method: "POST",
    body: {
      credentials
    }
  })
  if ((await user)) {
    return navigateTo('/')
  }
}

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password'
}]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <div class="w-full h-full flex justify-center items-center">
        <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
          <UAuthForm align="top"  :fields="fields" :ui="{ base: 'text-center', footer: 'text-center' }" :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }">
            <template #title>
              <UIcon name="i-heroicons-lock-closed"/>
              <img class="w-full h-10 object-cover " src="~/assets/img/mtp.png" alt="">
            </template>
            <template #footer>
              <div class="w-full flex flex-col gap-4 justify-center items-center">
                <UDivider label="OR" />
                <GoogleSignInButton theme="filled_black" class="flex justify-center items-center" @success="handleLoginSuccess" shape="pill"  />
              </div>
            </template>
          </UAuthForm>
        </UCard>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>

</style>
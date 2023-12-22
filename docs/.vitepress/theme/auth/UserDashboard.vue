<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import UserApiKey from './UserApiKey.vue'
import { useSupabase } from '@/supabase'

const supabase = useSupabase()

const supabaseUser = supabase.user

const router = useRouter()

onMounted(async () => {
  const session = await supabase.client.auth.getSession()

  if (!session || !session.data || !session.data.session)
    await router.go('/auth/signin')
})

function signOut() {
  supabase.client.auth.signOut()

  router.go('/auth/signin')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-full max-w-2xl p-8 space-y-8">
      <div v-if="!supabaseUser">
        <p>Cargando...</p>
      </div>

      <div v-else class="flex flex-col space-y-4">
        <div class="flex flex-row items-center justify-between">
          <h1 class="text-2xl">
            {{ supabaseUser.user_metadata.full_name || supabaseUser.email }}
          </h1>

          <button
            class="button-secondary px-2 py-1 rounded"
            @click="signOut"
          >
            Cerrar sesión
          </button>
        </div>

        <hr class="w-full border-gray-300 dark:border-gray-700">

        <UserApiKey />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vitepress'
import { useSupabase } from '@/supabase'

const supabaseUser = useSupabase().user

const router = useRouter()

function handleClick() {
  if (supabaseUser.value)
    router.go('/auth/dashboard')
  else router.go('/auth/signin')
}
</script>

<template>
  <div class="ml-4">
    <button class="button-primary py-1 px-2 rounded" @click="handleClick">
      {{ supabaseUser ? 'Dashboard' : 'Ingresar' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from '@nuxtbase/auth-ui-vue'
import { useSupabase } from '@/supabase'

const supabase = useSupabase()

const redirectTo = 'https://esjs-argentina-datos-docs-ochre.vercel.app/auth/signin'
</script>

<template>
  <div class="flex flex-col items-center justify-center py-2">
    <div class="flex flex-col space-y-2">
      <h1 class="text-2xl font-bold">
        Ingresar
      </h1>

      <h2 class="text-xl">
        Para obtener un API Key de ArgentinaDatos debes ingresar con tu cuenta de GitHub
      </h2>
    </div>

    <Auth
      :supabase-client="supabase.client"
      :appearance="{
        theme: ThemeSupa,
      }"
      :providers="['github']"
      only-third-party-providers
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import {
  OkuAlertDialog,
  OkuAlertDialogAction,
  OkuAlertDialogCancel,
  OkuAlertDialogContent,
  OkuAlertDialogDescription,
  OkuAlertDialogOverlay,
  OkuAlertDialogPortal,
  OkuAlertDialogTitle,
  OkuAlertDialogTrigger,
} from '@oku-ui/alert-dialog'
import { useSupabase } from '@/supabase'

const supabase = useSupabase()

const supabaseUser = supabase.user

const apiKey = ref(null)

const copyText = ref('Copiar')

watch(supabaseUser, async (user) => {
  if (!user)
    return

  apiKey.value = await fetchApiKey()
})

async function fetchApiKey() {
  const { data, error } = await supabase.client
    .from('access_tokens')
    .select('token')
    .eq('user_id', supabaseUser.value.id)
    .single()

  if (error)
    return

  return data.token
}

function copyToClipboard() {
  const el = document.createElement('textarea')
  el.value = apiKey.value
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  copyText.value = 'Copiado!'
  setTimeout(() => {
    copyText.value = 'Copiar'
  }, 1000)
}

async function renovateApiKey() {
  apiKey.value = null

  const token = uuidv4()

  const { data, error } = await supabase.client
    .from('access_tokens')
    .update({ token })
    .eq('user_id', supabaseUser.value.id)
    .select()

  if (error)
    return

  apiKey.value = await fetchApiKey()
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl">
      API Key
    </h2>

    <div class="flex flex-col space-y-4">
      <div
        class="flex flex-row items-center p-2 text-sm bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
      >
        <p class="select-all">
          {{ apiKey || 'Cargando...' }}
        </p>

        <span class="flex-1" />

        <button
          v-if="apiKey"
          class="px-2 py-1 button-primary rounded"
          @click="copyToClipboard(apiKey)"
        >
          {{ copyText }}
        </button>
      </div>

      <div class="flex flex-row gap-4">
        <OkuAlertDialog>
          <OkuAlertDialogTrigger as-child>
            <button :disabled="!apiKey" class="button-danger px-2 py-1 rounded">
              Renovar API Key
            </button>
          </OkuAlertDialogTrigger>
          <OkuAlertDialogPortal>
            <OkuAlertDialogOverlay class="z-40 bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
            <OkuAlertDialogContent
              class="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-gray-900 p-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
            >
              <OkuAlertDialogTitle class="text-lg font-medium">
                Renovar API Key
              </OkuAlertDialogTitle>
              <OkuAlertDialogDescription class="my-3">
                Si continuas, se generará una nueva API Key y la anterior dejará de funcionar.
              </OkuAlertDialogDescription>
              <div class="flex justify-end gap-4">
                <OkuAlertDialogCancel as-child>
                  <button class="button-secondary px-4 py-2 rounded">
                    Cancelar
                  </button>
                </OkuAlertDialogCancel>
                <OkuAlertDialogAction as-child>
                  <button :disabled="!apiKey" class="button-danger px-4 py-2 rounded" @click="renovateApiKey">
                    Renovar
                  </button>
                </OkuAlertDialogAction>
              </div>
            </OkuAlertDialogContent>
          </OkuAlertDialogPortal>
        </OkuAlertDialog>
      </div>
    </div>
  </div>
</template>

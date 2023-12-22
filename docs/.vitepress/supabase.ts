import { createClient } from '@supabase/supabase-js'
import { useSupabaseUser } from '@nuxtbase/auth-ui-vue'

export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export const useSupabase = () => {
  const client = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
  )
  const { supabaseUser } = useSupabaseUser(client)
  return {
    user: supabaseUser,
    client,
  }
}

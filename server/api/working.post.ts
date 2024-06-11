import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const check = 'heartbeat' in body
  if (!check) {
    return
  }

  post()

})

async function post() {

  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const supabase = createClient(appConfig.supabaseUrl, runtimeConfig.supabaseAnnoKey)
}
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const { id, msg } = await readBody(event);

  if (id !== "19960928") {
    return "错误的请求🙅";
  }

  const runtimeConfig = useRuntimeConfig();
  const appConfig = useAppConfig();

  if (isBlank(appConfig.outer.supabaseUrl, runtimeConfig.supabaseKey)) {
    throw createError({
      statusCode: 500,
      statusMessage: '缺少配置，请查看 supabaseUrl、supabaseKey 是否完整',
    })
  }

  const supabaseClient = createClient(
    appConfig.outer.supabaseUrl,
    runtimeConfig.supabaseKey
  );
  const supabaseCannel = supabaseClient.channel("lyp-ink");

  supabaseCannel.subscribe((status) => {
    if (status !== "SUBSCRIBED") {
      return null;
    }

    supabaseCannel.send({
      type: "broadcast",
      event: "mystatus",
      payload: { message: msg },
    });
  });
});
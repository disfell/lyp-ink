import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const appConfig = useAppConfig();

  if (isBlank(appConfig.outer.supabaseUrl, runtimeConfig.supabaseKey)) {
    throw createError({
      statusCode: 500,
      statusMessage: '缺少配置，请查看 supabaseUrl、supabaseKey 是否完整',
    })
  }
  
  const supabase = createClient(
    appConfig.outer.supabaseUrl,
    runtimeConfig.supabaseKey
  );
  const body = await readBody(event);
  const url = body?.url;

  let ret = [];
  try {
    const { data, error } = await supabase
      .from("lyp-view-count")
      .select("*")
      .eq("url", url);
    if (error) {
      console.error(error);
      throw error;
    }
    ret = data;
  } catch (err) {
    console.error(err);
    return err;
  }

  if (!ret || ret.length <= 0) {
    try {
      const { data, error } = await supabase
        .from("lyp-view-count")
        .insert([{ url: url, view_count: 1 }])
        .select();
      if (error) {
        console.error(error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  const count = ret[0]["view_count"] + 1;

  if (ret && ret.length == 1) {
    try {
      const { data, error } = await supabase
        .from("lyp-view-count")
        .update({ view_count: count })
        .eq("url", url)
        .select();
      if (error) {
        console.error(error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  return count;
});
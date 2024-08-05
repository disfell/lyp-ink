import { createClient } from "@supabase/supabase-js";
import { serverQueryContent } from "#content/server";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const appConfig = useAppConfig();
  const supabase = createClient(
    appConfig.supabaseUrl,
    runtimeConfig.supabaseKey
  );
  const body = await readBody(event);
  const url = body?.url;

  const records = await serverQueryContent(event).only(["_path"]).find();

  const map = {};

  records.forEach((object) => {
    map[object["_path"]] = "";
  });

  if (!map.hasOwnProperty(url)) {
    return;
  }

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

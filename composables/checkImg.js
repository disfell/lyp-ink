import { withBase } from "ufo";
import { useRuntimeConfig } from "#imports";

export default function (src, bycdn) {
  const appConfig = useAppConfig();
  let url = src;
  if (url?.startsWith("/") && !url.startsWith("//")) {
    url = withBase(url, useRuntimeConfig().app.baseURL);
  }
  if (bycdn) {
    // 除了 webp，其余图片均转为 WebP
    const tmp = url.toLowerCase();
    if (tmp.indexOf(".webp") > 0 || tmp.indexOf(".gif") > 0) {
      return `${appConfig.cloudimg}/${appConfig.domain}${url}?org_if_sml=1`;
    } else {
      return `${appConfig.cloudimg}/${appConfig.domain}${url}?force_format=webp,jpeg&org_if_sml=1`;
    }
  } else {
    return url;
  }
}

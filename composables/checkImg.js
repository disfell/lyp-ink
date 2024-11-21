import { withBase } from "ufo";
import { useRuntimeConfig } from "#imports";

export default function (src, bycdn) {
  const appConfig = useAppConfig();
  const config = useRuntimeConfig();
  const thirdPartImgServer = config.public.thirdPartImgServer
  let url = src;
  if (url?.startsWith("/") && !url.startsWith("//")) {
    url = withBase(url, thirdPartImgServer ? thirdPartImgServer : useRuntimeConfig().app.baseURL);
  }

  if (bycdn === 'true') {
    // 除了 webp，其余图片均转为 WebP
    const tmp = url.toLowerCase();
    const originalServer = appConfig.domain
    const server = thirdPartImgServer != null ? thirdPartImgServer : originalServer
    if (tmp.indexOf(".webp") > 0 || tmp.indexOf(".gif") > 0) {
      url = `${config.public.cloudimage}/${server}${url}?org_if_sml=1`;
    } else {
      url = `${config.public.cloudimage}/${server}${url}?force_format=webp,jpeg&org_if_sml=1`;
    }
  }
  return url;
}

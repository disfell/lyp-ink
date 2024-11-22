import { withBase } from "ufo";
import { useRuntimeConfig } from "#imports";

export default function (src, bycdn) {
  const appConfig = useAppConfig();
  const config = useRuntimeConfig();
  const thirdPartImgServ = config.public.thirdPartImgServ;
  let url = src;

  if (!src.startsWith("/imgs")) {
    if (url?.startsWith("/") && !url.startsWith("//")) {
      url = withBase(url, useRuntimeConfig().app.baseURL);
    }
    return url;
  }

  if (bycdn === null || bycdn.trim() === "") {
    if (url?.startsWith("/") && !url.startsWith("//")) {
      url = withBase(url, thirdPartImgServ ? thirdPartImgServ : useRuntimeConfig().app.baseURL);
    }
    return url;
  }

  // 除了 webp，其余图片均转为 WebP
  const tmp = url.toLowerCase();
  const originalServer = appConfig.domain;
  const server = thirdPartImgServ != null ? thirdPartImgServ : originalServer;
  if (tmp.indexOf(".webp") > 0 || tmp.indexOf(".gif") > 0) {
    url = `${config.public.imgCDN}/${server}${url}?org_if_sml=1`;
  } else {
    url = `${config.public.imgCDN}/${server}${url}?force_format=webp,jpeg&org_if_sml=1`;
  }
  return url;
}

import { steamDict } from "./config/steam-dict";
import { nuxtUI } from "./config/nuxt-ui";
import { site } from "./config/site";
import { outer } from "./config/outer";

export default defineAppConfig({
  site: site,
  outer: outer,
  ui: nuxtUI,
  steamGameDictCN: steamDict,
});

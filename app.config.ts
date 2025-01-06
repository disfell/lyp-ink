import { steamDict } from "./config/steam-dict";
import { nuxtUI } from "./config/nuxt-ui";
import { site } from "./config/site";
import { outer } from "./config/outer";
import { blogClub } from "./config/blog-club";
import { bookmark } from "./config/bookmark";
import { provider } from "./config/provider";

export default defineAppConfig({
  site: site,
  blogClub: blogClub,
  outer: outer,
  ui: nuxtUI,
  steamGameDictCN: steamDict,
  bookmark: bookmark,
  provider: provider,
});

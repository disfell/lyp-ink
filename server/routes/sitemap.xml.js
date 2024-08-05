import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find();
  const sitemap = new SitemapStream({
    hostname: useAppConfig().domain,
  });

  sitemap.write({
    url: "/",
    changefreq: "yearly",
  });

  for (const doc of docs) {
    if (false != doc?.show) {
      sitemap.write({
        url: doc._path,
        changefreq: "monthly",
      });
    }
  }
  sitemap.end();

  return streamToPromise(sitemap);
});

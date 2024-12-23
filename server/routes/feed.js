import { Feed } from "feed";
import { serverQueryContent } from "#content/server";

export default defineEventHandler(async event => {
  const hostname = useAppConfig().site.domain;
  const title = useAppConfig().site.title;
  const email = useAppConfig().site.email;
  var feed = new Feed({
    title: useAppConfig().site.title,
    description: "This is my personal feed!",
    id: title,
    link: hostname,
    generator: title,
    docs: hostname,
    language: "zh-CN",
    updated: new Date(),
    author: {
      name: title,
      email: email,
      link: hostname,
    },
  });
  const qryRes = await serverQueryContent(event).only(["title", "description", "published", "slug", "_path"]).sort({ published: -1 }).find();
  const records = qryRes.filter(doc => doc?._path?.includes("/records") && "/records" != doc?._path);

  for (const doc of records) {
    feed.addItem({
      title: "" + doc.title,
      id: `${hostname}${doc._path}`,
      link: `${hostname}${doc._path}`,
      date: new Date(doc.published),
      description: doc?.description && doc?.description.trim() != "" ? doc.description : "无概述，请查看原文",
    });
  }
  return feed.rss2();
});

import { Feed } from "feed"
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const hostname = 'https://lyp.ink'
  var feed = new Feed({
    title: 'LYP.INK',
    description: "This is my personal feed!",
    id: hostname,
    link: hostname,
    generator: hostname,
    docs: hostname,
    language: 'zh-CN',
    updated: new Date()
  })
  const records = await serverQueryContent(event)
	.only(['_path', 'date', 'title'])
	.sort({ date: -1 , $numeric: true})
	.find()
  const records_ = records.filter((doc) => doc?._path?.includes('/record') && doc?._path != '/records')
  
  for (const doc of records_) {
    feed.addItem({
      title: '' + doc.title,
      id: `${hostname}${doc._path}`,
      link: `${hostname}${doc._path}`,
      date: new Date(doc.date),
      description: "无概述，请查看原文"
    })
  }
  return feed.rss2()
})
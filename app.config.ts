export default defineAppConfig({
  site: {
    domain: "https://lyp.ink",
    title: "LYP",
    avatar: "/avatar.webp",
    intro: "Hi，我是 LYP，该网站主要记录自己的学习、游戏、心得，捣鼓一些业余的东西。🌵",
    menus: [
      { name: "首页", path: "/", icon: "solar:home-smile-outline" },
      {
        name: "记录",
        path: "/records",
        icon: "solar:document-add-outline",
      },
      {
        name: "书签",
        path: "/bookmarks",
        icon: "solar:bookmark-linear",
      },
    ],
  },
  outer: {
    faviconCatcher: "https://icon.horse/icon",
    supabaseUrl: "https://wbyxltcwssusdaywispe.supabase.co",
    supabaseAnnoKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXhsdGN3c3N1c2RheXdpc3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3MjU0NzcsImV4cCI6MjAzMzMwMTQ3N30.k3wZYezUISBhadwguP978NCqfSMFmKhscrTYQ_nFcDE",
  },
  ui: {
    primary: "teal",
    gray: "neutral",
    formGroup: {
      help: "text-xs mt-1 text-gray-500 dark:text-gray-400",
      error: "text-xs mt-1 text-red-500 dark:text-red-400",
      label: {
        base: "text-sm block font-medium text-gray-500 dark:text-gray-200",
      },
    },
    button: {
      rounded: "rounded-md transition-transform active:scale-x-[0.98] active:scale-y-[0.99]",
    },
    modal: {
      overlay: {
        background: "bg-[rgba(0,8,47,.275)] saturate-50",
      },
      padding: "p-0",
      rounded: "rounded-t-2xl sm:rounded-xl",
      transition: {
        enterFrom: "opacity-0 translate-y-full sm:translate-y-0 sm:scale-x-95",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-x-100",
      },
    },
    container: {
      constrained: "max-w-2xl",
    },
  },
  steamGameDictCN: {
    3590: "植物大战僵尸",
    105600: "星露谷",
    292030: "巫师3：狂猎",
    367520: "空洞骑士",
    424840: "小小梦魇1",
    435150: "神界原罪2",
    582010: "怪物猎人·世界",
    588650: "死亡细胞",
    601150: "鬼泣5",
    814380: "只狼·影逝二度",
    860510: "小小梦魇2",
    1057090: "精灵与萤火意志",
    1238840: "战地风云1",
    1245620: "艾尔登法环",
    1296830: "暖雪",
    1371980: "恶意不息",
    1449690: "行尸走肉",
    1517290: "战地风云5",
    2138710: "师傅",
    2358720: "黑神话·悟空",
    2379780: "小丑牌",
    1086940: "博得之门3",
    275850: "无人深空",
    571310: "蒸汽世界：挖掘2",
    1130410: "赛博之钩",
  },
});

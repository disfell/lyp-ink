export default defineEventHandler(async (event) => {
  const current = new Date()
  const body = await readBody(event)
  if (body != null && 'working' in body) {
    localCache.working = true
    localCache.lastWorkingTime = current.getTime()
    return
  }
  const config = useAppConfig()
  const steamToken = config.steamToken
  const steamId = config.steamId

  const steamPlayingURL = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamToken}&steamids=${steamId}`
  const steamRecentlyURL = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1?key=${steamToken}&steamid=${steamId}`

  const steamPlayingLastQryDiff = (current.getTime() - localCache.steamPlayingLastQry.getTime()) / (1000 * 60)
  const steamRecentlyLastQryDiff = (current.getTime() - localCache.steamRecentlyLastQry.getTime()) / (1000 * 60)

  // 请求 Steam Api
  if (steamPlayingLastQryDiff > 1) {
    localCache.steamPlayingLastQry = current
    try {
      const result = await fetch(steamPlayingURL)
      const data = await result.json();
      const players = data['response']['players'][0]
      localCache.personastate = players['personastate']
      localCache.gameextrainfo = players['gameextrainfo']
      localCache.gameid = players['gameid']
      if (players['gameid'] in steamGameDictCN) {
        localCache.gameextrainfo_cn = steamGameDictCN[players['gameid']]
      }
    } catch (err) {
      localCache.steamPlayingLastQry = new Date('2000-01-01T00:00:00')
      console.error(err)
    }
  }

  // 请求 Steam Api
  if (steamRecentlyLastQryDiff > 60) {
    localCache.steamRecentlyLastQry = current
    try {
      const result = await fetch(steamRecentlyURL)
      const data = await result.json() as ApiResponse
      const playerListTmp = data.response.games
      // 创建一个新数组，只包含所需的字段
      const playerList = playerListTmp.map(game => {
        // 检查字典B中是否有对应的appid，并更新name字段
        const simplifiedGame = {
          appid: game.appid,
          name: game.name,
          name_cn: steamGameDictCN[game.appid] || game.name,
          playtime_forever: game.playtime_forever,
          playtime_2weeks: game.playtime_2weeks
        };
        return simplifiedGame;
      })
      localCache.games = playerList
    } catch (err) {
      localCache.steamRecentlyLastQry = new Date('2000-01-01T00:00:00')
      console.error(err)
    }
  }

  const w_heartbeat = (current.getTime() - localCache.lastWorkingTime) / 1000 / 60
  if (localCache.working == false || w_heartbeat > 1.5) {
    localCache.working = false
    localCache.lastWorkingTime = 0
  } else {
    localCache.working = true
  }
  setResponseStatus(event, 200)
  return localCache
})

interface LocalCache {
  personastate: string;
  gameextrainfo: string;
  gameextrainfo_cn: string;
  gameid: string;
  games: any;
  working: boolean,
  lastWorkingTime: number,
  steamPlayingLastQry: Date,
  steamRecentlyLastQry: Date,
}

const localCache: LocalCache = {
  personastate: '',
  gameextrainfo: '',
  gameextrainfo_cn: '',
  gameid: '',
  games: [],
  working: false,
  lastWorkingTime: 0,
  steamPlayingLastQry: new Date('2000-01-01T00:00:00'),
  steamRecentlyLastQry: new Date('2000-01-01T00:00:00'),
}

interface SteamGame {
  appid: string;
  name: string;
  playtime_forever: number;
  playtime_2weeks: number;
}

interface ApiResponse {
  response: {
    games: SteamGame[];
  }
}

const steamGameDictCN: { [key: string]: string } = {
  '3590': '植物大战僵尸',
  '105600': '星露谷',
  '292030': '巫师3：狂猎',
  '367520': '空洞骑士',
  '424840': '小小梦魇1',
  '435150': '神界原罪2',
  '582010': '怪物猎人·世界',
  '588650': '死亡细胞',
  '601150': '鬼泣5',
  '814380': '只狼·影逝二度',
  '860510': '小小梦魇2',
  '1057090': '精灵与萤火意志',
  '1238840': '战地风云1',
  '1245620': '艾尔登法环',
  '1296830': '暖雪',
  '1371980': '恶意不息',
  '1449690': '行尸走肉',
  '1517290': '战地风云5',
  '2138710': '师傅',
  '2358720': '黑神话·悟空',
  '2379780': '小丑牌',
  '1086940': '博得之门'
}
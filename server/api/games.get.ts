import { createClient } from '@supabase/supabase-js'
import dayjs from 'dayjs'

export default defineEventHandler(async (event) => {
  const current = new Date()
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const steamToken = runtimeConfig.steamToken
  const steamId = runtimeConfig.steamId
  const steamGameDictCN: { [key: string]: string } = appConfig.steamGameDictCN
  const supabase = createClient(appConfig.supabaseUrl, runtimeConfig.supabaseKey)
  const steamRecentlyURL = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1?key=${steamToken}&steamid=${steamId}`

  // 先从数据库获取
  let supabaseList: any = []
  try {
    const { data, error } = await supabase
      .from('lyp-steam-games')
      .select('*')
      supabaseList = data
    
    if (error) {
      console.error(error)
      return supabaseList
    }
  } catch(err) {
    console.error(err)
  }

  if (supabaseList != null && supabaseList.length > 0) {
    const pastDate = dayjs(supabaseList[0]['updated_time']);
    const isYesterday = dayjs().diff(pastDate, 'day') === 1;
    if (!isYesterday) {
      return {data: supabaseList, from: 'database'}
    }
  }

  // 数据库-无数据，从steam获取
  let gameList: any = []
  try {
    const result = await fetch(steamRecentlyURL)
    const data = await result.json() as ApiResponse
    const playerListTmp = data.response.games
    // 创建一个新数组，只包含所需的字段
    const playerList = playerListTmp.map((game, idx) => {
      // 检查字典B中是否有对应的appid，并更新name字段
      return {
        id: idx + 1,
        game_id: String(game.appid),
        name: game.name,
        name_cn: steamGameDictCN[game.appid] || game.name,
        play_time: String(game.playtime_forever),
        play_time_2weeks: String(game.playtime_2weeks),
        updated_time: current.toISOString()
      }
    })
    gameList = playerList
  } catch (err) {
    console.error(err)
  }

  insertData(supabase, gameList)

  return {data: gameList, from: 'steam'}
})

async function insertData(supabase: any, gameList: []) {
  // 插入数据到数据库
  try {
    await supabase
      .from('lyp-steam-games')
      .delete()

    await supabase
      .from('lyp-steam-games')
      .insert(gameList)
      .select()

  } catch(err) {
    console.error(err)
  }
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
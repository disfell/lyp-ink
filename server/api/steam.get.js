export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const steamGameDictCN = appConfig.steamGameDictCN
  const steamToken = runtimeConfig.steamToken
  const steamId = runtimeConfig.steamId
  const steamPlayingURL = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamToken}&steamids=${steamId}`

  const ret = {}
  try {
    const result = await fetch(steamPlayingURL)
    const data = await result.json()
    const players = data['response']['players'][0]
    ret['status'] = players['personastate']
    ret['game'] = players['gameextrainfo']
    ret['game_id'] = players['gameid']
    if (players['gameid'] in steamGameDictCN) {
      ret['game_cn']  = steamGameDictCN[players['gameid']]
    }
    return ret
  } catch (err) {
    console.error(err)
    return ret
  }

})
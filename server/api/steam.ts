interface SteamPlayer {
  personastate: number;
  gameextrainfo: string;
  gameid: number;
  // 可能还有其他属性，根据实际返回的数据结构添加
}

interface SteamResponse {
  response: {
    players: SteamPlayer[];
  };
}

interface SteamGameDictCN {
  [key: number]: string;
}

interface RetType {
  status?: number;
  game?: string;
  game_id?: number;
  game_cn?: string;
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const appConfig = useAppConfig();
  const steamGameDictCN: SteamGameDictCN = appConfig.steamGameDictCN;
  const steamToken: string = runtimeConfig.steamToken;
  const steamId: string = runtimeConfig.steamId;
  const steamPlayingURL = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamToken}&steamids=${steamId}`;

  const ret: RetType = {};

  try {
    const result = await fetch(steamPlayingURL);
    const data: SteamResponse = await result.json();
    const players = data.response.players[0];
    ret.status = players.personastate;
    ret.game = players.gameextrainfo;
    ret.game_id = players.gameid;
    ret.game_cn = players.gameextrainfo;
    if (players.gameid in steamGameDictCN) {
      ret.game_cn = steamGameDictCN[players.gameid];
    }
    return ret;
  } catch (err) {
    console.error(err);
    return ret;
  }
});

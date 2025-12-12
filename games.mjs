import filterJSON, { getMarketInfo, getIndentificationInfo } from "./filterjson.mjs"



const CreatorTypes = {
    User  : "User",
    Group : "Group",
}

const CREATOR_TYPE_URIS = {
    [CreatorTypes.User]  : "users",
    [CreatorTypes.Group] : "groups",
}

const GAME_PASS_EXHAUST_FIELDS = {
    parameter : "pageToken", 
    property  : "nextPageToken",
    extract   : (body) => body.gamePasses,
}

const Games = {}



Games.get = async function(creatorId, creatorType) {
    const creatorTypeUri = CREATOR_TYPE_URIS[creatorType]
    if (!creatorTypeUri) {
        throw new Error("Unkown creator type.")
    }
    
    const parameters = {}

    parameters.url     = `https://games.roblox.com/v2/${creatorTypeUri}/${creatorId}/games?accessFilter=2&limit=50&sortOrder=Asc`
    parameters.filter  = getIndentificationInfo
    parameters.exhaust = true

    return await filterJSON(parameters)
}

Games.getPasses = async function(universeId) {
    const parameters = {}

    parameters.url           = `https://apis.roblox.com/game-passes/v1/universes/${universeId}/game-passes?passView=Full&pageSize=50`
    parameters.filter        = getMarketInfo
    parameters.exhaust       = true
    parameters.exhaustFields = GAME_PASS_EXHAUST_FIELDS

    return await filterJSON(parameters)
}



export default Games
export { CreatorTypes }

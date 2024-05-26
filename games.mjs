import filterJSON, { getMarketInfo, getIndentificationInfo } from "./filterjson.mjs"


const Games = {}

const CreatorTypes = {
    User: "User",
    Group: "Group",
}


Games.get = async function(creatorId, creatorType) {
    const creatorTypeUris = {
        [CreatorTypes.User]: "users",
        [CreatorTypes.Group]: "groups",
    }
    
    const creatorTypeUri = creatorTypeUris[creatorType]
    if (!creatorTypeUri) {
        throw new Error("Unkown creator type.")
    }
    
    const games = await filterJSON({
        url: `https://games.roblox.com/v2/${creatorTypeUri}/${creatorId}/games?accessFilter=2&limit=50&sortOrder=Asc`,
        exhaust: true,
        filter: getIndentificationInfo,
    })

    return games
}

Games.getPasses = async function(universeId) {
    const passes = await filterJSON({
        url: `https://games.roblox.com/v1/games/${universeId}/game-passes?limit=10&sortOrder=1`,
        exhaust: true,
        filter: getMarketInfo,
    })

    return passes
}


export default Games
export { CreatorTypes }
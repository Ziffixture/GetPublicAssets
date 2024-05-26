import Groups from "./groups.mjs"
import Games, { CreatorTypes } from "./games.mjs"


async function getPublicAssets(userId) {
    const games = await Games.get(userId, CreatorTypes.User)
    const groups = await Groups.get(userId)

    let result = {
        gamePasses: [],
        groupGamePasses: [],
        groupStoreAssets: [],
    }
    
    for (const game of games) {
        const gamePasses = await Games.getPasses(game.id)

        result.gamePasses.push(...gamePasses)
    }

    for (const group of groups) {
        const groupGames = await Games.get(group.id, CreatorTypes.Group)
        const storeAssets = await Groups.getStoreAssets(group.id)
        
        for (const game of groupGames) {
            const gamePasses = await Games.getPasses(game.id)

            result.groupGamePasses.push(...gamePasses)
        }

        result.groupStoreAssets.push(...storeAssets)
    }

    return result
}


const result = await getPublicAssets(/*User Id*/)
console.log(result)

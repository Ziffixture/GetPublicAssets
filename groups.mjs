import filterJSON, { getMarketInfo, getIndentificationInfo } from "./filterjson.mjs"



const Groups = {}



function getIdentificationInfoOfOwned(row, userId) {
    const group = row.group
    if (row.group.owner.userId == userId) {
        return getIndentificationInfo(group)
    }
}


Groups.get = async function(userId) {
    const parameters = {}

    parameters.url     = `https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=false&includeNotificationPreferences=false`
    parameters.filter  = (row) => getIdentificationInfoOfOwned(row, userId)
    parameters.exhaust = true

    return await filterJSON(parameters)
}

Groups.getStoreAssets = async function(groupId) {
    const parameters = {}

    parameters.url     = `https://catalog.roblox.com/v1/search/items/details?CreatorTargetId=${groupId}&CreatorType=2&Limit=30`
    parameters.filter  = getMarketInfo
    parameters.exhaust = true

    return await filterJSON(parameters)
}



export default Groups

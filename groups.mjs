import filterJSON, { getMarketInfo, getIndentificationInfo } from "./filterjson.mjs"


const Groups = {}


Groups.get = async function(userId) {
    const groups = await filterJSON({
        url: `https://groups.roblox.com/v1/users/${userId}/groups/roles?includeLocked=false&includeNotificationPreferences=false`,
        exhaust: false,
        filter: function (row) {
            const group = row.group
            if (group.owner.userId != userId) {
                return
            }

            return getIndentificationInfo(group)
        }
    })

    return groups
}

Groups.getStoreAssets = async function(groupId) {
    const storeAssets = await filterJSON({
        url: `https://catalog.roblox.com/v1/search/items/details?CreatorTargetId=${groupId}&CreatorType=2&Limit=30`,
        exhaust: true,
        filter: getMarketInfo,
    })

    return storeAssets
}


export default Groups
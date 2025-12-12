const DEFAULT_EXHAUST_FIELDS = {
    parameter : "cursor", 
    property  : "nextPageCursor", 
    extract   : (body) => body.data,
}



export function getMarketInfo(item) {
    return {
        id    : item.id,
        name  : item.name,
        price : item.price,
    }
}

export function getIndentificationInfo(item) {
    return {
        id   : item.id,
        name : item.name,
    }
}


export default async function filterJSON(parameters) {
    let results = []

    const exhaust       = parameters.exhaust
    const exhaustFields = parameters.exhaustFields ?? DEFAULT_EXHAUST_FIELDS
        
    const url    = parameters.url
    const filter = parameters.filter

    let cursor = ""

    try {
        do {
            const response = await fetch(`${url}&${exhaustFields.parameter}=${cursor}`)
            if (!response.ok) {
                return
            }

            const body = await response.json()
            const data = exhaustFields.extract(body)

            for (const row of data) {
                const result = filter(row)
                if (result) {
                    results.push(result)
                }
            }

            cursor = exhaust && body[exhaustFields.property]
        } while (cursor)
    } 
    catch (error) {
        console.log(error)
    }

    return results
}

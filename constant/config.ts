export const pinata_apikey = "415d6f59fb694b855eb1"
export const pinata_secret = "6ace3b02c976ded71283b9b7f63e888d3dda016dfe792dfcd0e199edc58d627e"

export const readHeader = {
    "Content-Type": "application/json"
}

export const getHeader = {
    headers: {
        pinata_api_key: pinata_apikey,
        pinata_secret_api_key: pinata_secret
    }
}

export const sendJsonHeader = {
    headers: {
        "Content-Type": "application/json",
        pinata_api_key: pinata_apikey,
        pinata_secret_api_key: pinata_secret
    }
}
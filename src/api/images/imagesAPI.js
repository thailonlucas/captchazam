import { IMAGES_EP } from "../endpoints"
import { getFetchHeader } from "../UtilsAPI"

export const getImagesAPI = async () => {
    let response = await fetch(IMAGES_EP.getImages())
    return await response.json()
}

export const setImagesOutlierAPI = async (body) => {
    let response = await fetch(IMAGES_EP.getImages(), getFetchHeader('POST', body))
    return await response.json()
}

export const getSamplesSizeAPI = async () => {
    let response = await fetch(IMAGES_EP.getSamplesSize())
    return await response.json()
}
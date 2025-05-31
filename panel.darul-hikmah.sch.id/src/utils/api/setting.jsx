import {APICore} from './APICore'

const api = new APICore();

function get(params) {
    const baseUrl = '/setting'
    return api.get(baseUrl, params)
}

function update(params) {
    const baseUrl = `/setting/${params.id}`
    return api.updateWithFile(baseUrl, params)
}

export {get, update}
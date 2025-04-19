import {APICore} from './APICore'
import RToast from "../../components/toast/index.jsx";

const api = new APICore()

function get(params) {
    const baseUrl = '/brand'
    return api.get(baseUrl, params).then((resp) => {
        return resp.result
    })
}

function store(params) {
    const baseUrl = '/brand'
    return api.createWithFile(baseUrl, params).then((resp => {
        const {message} = resp
        RToast(message, 'success')
    })).catch(() => {
        throw new Error()
    })
}

function update(params) {
    const baseUrl = `/brand/${params.id}`
    return api.updateWithFile(baseUrl, params).then((resp => {
        const {message} = resp
        RToast(message, 'success')
    })).catch(() => {
        throw new Error()
    })
}

function destroy(id) {
    const baseUrl = `/brand/${id}`
    return api.delete(baseUrl).then((resp => {
        const {message} = resp
        RToast(message, 'success')
    })).catch(() => {
        throw new Error()
    })
}

export {get, store, update, destroy}
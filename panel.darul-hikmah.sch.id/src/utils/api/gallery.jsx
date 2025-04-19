import {APICore} from './APICore'
import RToast from "../../components/toast/index.jsx";

const api = new APICore()

function get(params) {
    const baseUrl = '/gallery'
    return api.get(baseUrl, params).then((resp) => {
        return resp.result
    })
}

function store(params) {
    const baseUrl = '/gallery'
    return api.createWithFile(baseUrl, params).then((resp) => {
        const {message} = resp
        RToast(message, 'success')
    }).catch(() => {
        throw new Error()
    });
}

function update(params) {
    const baseUrl = `/gallery/${params.id}`
    return api.update(baseUrl, params).then((resp) => {
        const {message} = resp
        RToast(message, 'success')
    }).catch(() => {
        throw new Error()
    });
}

function destroy(id) {
    const baseUrl = `/gallery/${id}`
    return api.delete(baseUrl).then((resp) => {
        const {message} = resp
        RToast(message, 'success')
    }).catch(() => {
        throw new Error()
    });
}

export {get, store, update, destroy}
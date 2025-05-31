import {APICore} from './APICore'
import RToast from "../../components/toast/index.jsx";

const api = new APICore()

function get(params) {
    const baseUrl = '/category'
    return api.get(baseUrl, params).then((resp) => {
        return resp.result
    }).catch(() => [])
}

function store(params) {
    const baseUrl = '/category'
    return api.create(baseUrl, params).then((resp) => {
        const {message, result} = resp;
        RToast(message, 'success');
        return result
    }).catch(() => false)
}

function update(params) {
    const baseUrl = `/category/${params.id}`
    return api.update(baseUrl, params).then((resp) => {
        const {message, result} = resp;
        RToast(message, 'success');
        return result
    }).catch(() => false)
}

function destroy(id) {
    const baseUrl = `/category/${id}`
    return api.delete(baseUrl).then((resp) => {
        const {message, result} = resp;
        RToast(message, 'success');
        return result
    }).catch(() => false)
}

export {get, store, update, destroy}
import {APICore} from './APICore'
import RToast from "../../components/toast/index.jsx";

const api = new APICore()

function get(params) {
    const baseUrl = '/slider'
    return api.get(baseUrl, params)
}

function store(params) {
    const baseUrl = '/slider'
    return api.createWithFile(baseUrl, params).then((resp) => {
        const {message} = resp;
        RToast(message, 'success');
    }).catch(() => {
        throw new Error()
    })
}

function show(id) {
    const baseUrl = '/slider/' + id;
    return api.get(baseUrl).then((resp) => {
        return resp.result
    })
}

function update(params) {
    const baseUrl = `/slider/${params.id}`
    return api.updateWithFile(baseUrl, params).then((resp) => {
        const {message} = resp;
        RToast(message, 'success');
    }).catch(() => {
        throw new Error()
    })
}

function destroy(id) {
    const baseUrl = `/slider/${id}`
    return api.delete(baseUrl).then((resp) => {
        const {message} = resp;
        RToast(message, 'success');
    }).catch(() => {
        throw new Error()
    })
}

export {get, store, show, update, destroy}
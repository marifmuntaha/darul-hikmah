import {APICore} from './APICore'
import RToast from "../../components/toast/index.jsx";

const api = new APICore()

function get(params) {
    const baseUrl = '/article'
    return api.get(baseUrl, params).then((resp) => {
        return resp.result;
    }).catch(() => [])
}

function store(params) {
    const baseUrl = '/article'
    return api.createWithFile(baseUrl, params).then((resp) => {
        const {message, result} = resp;
        RToast(message, 'success');
        return result
    }).catch(() => false);
}

function show(id) {
    const baseUrl = `/article/${id}`
    return api.get(baseUrl).then((resp) => {
        return resp.result
    })
}

function update(params) {
    const baseUrl = `/article/${params.id}`
    return api.updateWithFile(baseUrl, params).then((resp) => {
        const {message, result} = resp;
        RToast(message, 'success');
        return result
    }).catch(() => false);
}

function destroy(id) {
    const baseUrl = `/article/${id}`
    return api.delete(baseUrl).then((resp) => {
        const {message, result} = resp;
        RToast(message, 'success');
        return result
    }).catch(() => false);
}

export {get, store, show, update, destroy}
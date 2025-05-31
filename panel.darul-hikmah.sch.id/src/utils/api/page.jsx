import {APICore} from './APICore'
import RToast from "../../components/toast/index.jsx";

const api = new APICore()

async function get(params) {
    const baseUrl = '/page'
    return await api.get(baseUrl, params).then((resp) => {
        return resp.result
    })
}

async function update(params) {
    const baseUrl = `/page/${params.id}`
    return await api.update(baseUrl, params).then((resp) => {
        const {message} = resp;
        RToast(message, 'success');
    }).catch(() => {
        throw new Error();
    })
}

function upload(params) {
    const baseUrl = `/page/upload`
    return api.createWithFile(baseUrl, params).then((resp) => {
        const {message, result} = resp
        RToast(message, 'success')
        return result;
    }).catch(() => {
        throw new Error();
    })
}

export {get, update, upload}
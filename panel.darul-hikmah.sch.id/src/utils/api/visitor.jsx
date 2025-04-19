import {APICore} from './APICore'
import RToast from "../../components/toast/index.jsx";

const api = new APICore()

function get(params) {
    const baseUrl = '/visitor'
    return api.get(baseUrl, params).then((resp) => {
        return resp.result
    }).catch(() => [])
}

export {get}
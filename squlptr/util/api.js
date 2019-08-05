// import {MAKE_API_CALL} from '../types';
let MAKE_API_CALL = "MAKE_API_CALL"

const generateApiAction = (method, path, data, successHandler, errorHandler, skipAuthHeader, config = {}) => {
    return {
        type: MAKE_API_CALL,
        payload: {
            method: method,
            path,
            data,
            successHandler,
            errorHandler,
            skipAuthHeader,
            config
        }
    };
};

export default {
    get: (path, params, successHandler, errorHandler, skipAuthHeader) => {
        return generateApiAction('get', path, params, successHandler, errorHandler, skipAuthHeader);
    },

    post: (path, data, successHandler, errorHandler, skipAuthHeader, config) => {
        return generateApiAction('post', path, data, successHandler, errorHandler, skipAuthHeader, config)
    },

    put: (path, data, successHandler, errorHandler, skipAuthHeader) => {
        return generateApiAction('put', path, data, successHandler, errorHandler, skipAuthHeader)
    },

    delete: (path, data, successHandler, errorHandler, skipAuthHeader) => {
        return generateApiAction('delete', path, data, successHandler, errorHandler, skipAuthHeader)
    },

    patch: (path, data, successHandler, errorHandler, skipAuthHeader) => {
        return generateApiAction('patch', path, data, successHandler, errorHandler, skipAuthHeader)
    },
}

import axios from 'axios';
// import {push} from 'react-router-redux';
import {logout, USER_DETAILS_API} from '../actions/auth';
// import {MAKE_API_CALL} from '../actions/types';
// import {_setFrom} from '../reducers/app';
import config from '../config';
// import notification from "antd/es/notification";
import dataStore from '../dataStore';
import { DATA_STORE_KEYS } from '../dataStore/keys';
import api from "./api";
let MAKE_API_CALL = "MAKE_API_CALL"


const handleSuccess = (response, dispatch) => {
    if (!response || response.status !== 202) {
        return;
    }

    if (!response.data || !response.data.responseMessage) {
        return;
    }

    // notification.open({
    //     type: 'warning',
    //     message: response.data.responseMessage,
    // });
};

const handleError = (error, dispatch, path) => {
    if (error.response && error.response.status === 401 && error.response.data) {
        // check if the token has expired
        return handleExpiredToken(dispatch, error);

    } else if ((error.response && error.response.status === 401) || (!error.response && USER_DETAILS_API === path)) {
        //handle user no access to resource
        // dispatch(logout());
        // dispatch(_setFrom(''));
        return Promise.reject(error);

    } else if (error.response && error.response.status === 403) {
        // dispatch(push('/dashboard'));
        notification.open({
            type: 'error',
            message: error.response.data.responseMessage,
        });

        return Promise.reject(error)

    } else if (error.response && error.response.status === 500) {
        let description = '';
        if (error.response.data) {
            description = error.response.data.responseMessage
        }

        notification.open({
            type: 'error',
            message: 'System error',
            description: description,
        });

        return Promise.reject(error);

    } else if (!error.response) {
        // run user details to confirm token is still valid
        dispatch(api.get(USER_DETAILS_API, {}, function () {}, function () {}));
    }
};

const handleExpiredToken = (dispatch, error) => {
    // dispatch(logout());
    // dispatch(_setFrom(''));
    return Promise.reject(error);
};

const baseUrl = config.SQULPTR_BASE_URL;

const handleApiCall = (dispatch, process, success, failure, skipAuthHeader, path) => {
    const instance = axios.create({baseURL: baseUrl});

    //set up the request interceptor here
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        if (skipAuthHeader) {
            return config;
        }

        const authorization = dataStore.get(DATA_STORE_KEYS.ACCESS_TOKEN);
        if (!authorization) {
            dispatch(logout());
            return Promise.reject('user not logged in')
        }

        config.headers = {...config.headers, Authorization: `Bearer ${authorization}`};
        return config;

    }, function (error) {
        // Do something with request error
        return Promise.reject(error)
    });

    //set up the response interceptor

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        // Do something with response data
        handleSuccess(response, dispatch);
        return response
    }, function (error) {
        // Do something with response error
        handleError(error, dispatch, path);
        return Promise.reject(error)
    });

    //make call here
    process(instance).then(response => success(response)).catch(error => failure(error))
};

const doDelete = (dispatch, path, data = {}, successHandler, errorHandler, skipAuthHeader = false) => {
    handleApiCall(dispatch, axios => axios.delete(path, {data}), response => successHandler(response), error => errorHandler(error), skipAuthHeader, path)
};

const doPatch = (dispatch, path, data = {}, successHandler, errorHandler, skipAuthHeader = false,) => {
    handleApiCall(dispatch, axios => axios.patch(path, data), response => successHandler && successHandler(response), error => errorHandler(error), skipAuthHeader, path)
};

const doPut = (dispatch, path, data = {}, successHandler, errorHandler, skipAuthHeader = false) => {
    handleApiCall(dispatch, axios => axios.put(path, data), response => successHandler(response), error => errorHandler(error), skipAuthHeader, path)
};

const doGet = (dispatch, path, params = {}, successHandler, errorHandler, skipAuthHeader = false) => {
    handleApiCall(dispatch, axios => axios.get(path, {params}), response => successHandler(response), error => errorHandler(error), skipAuthHeader, path)
};

const doPost = (dispatch, path, data = {}, successHandler, errorHandler, skipAuthHeader = false, config = {}) => {
    handleApiCall(dispatch, axios => axios.post(path, data, config), response => successHandler(response), error => errorHandler(error), skipAuthHeader, path)
};


export default ({dispatch}) => next => action => {
    if (action.type !== MAKE_API_CALL) {
        return next(action);
    }

    const {
        method,
        path,
        data,
        params,
        successHandler,
        errorHandler,
        skipAuthHeader,
    } = action.payload;

    switch (method) {
        case 'put':
            return doPut(dispatch, path, data, successHandler, errorHandler, skipAuthHeader);
        case 'post':
            return doPost(dispatch, path, data, successHandler, errorHandler, skipAuthHeader);
        case 'get':
            return doGet(dispatch, path, params, successHandler, errorHandler, skipAuthHeader);
        case 'patch':
            return doPatch(dispatch, path, data, successHandler, errorHandler, skipAuthHeader);
        case 'delete':
            return doDelete(dispatch, path, data, successHandler, errorHandler, skipAuthHeader);
        default:
            return next(action)
    }
};
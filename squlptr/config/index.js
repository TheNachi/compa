import dataStore from "../dataStore/keys";
import { DATA_STORE_KEYS } from "../dataStore/keys";

const configMap = {
    test: {
        common: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        },
        
        live: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        },
        test: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        }
    },
    dev: {
        common: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        },
        
        live: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        },
        test: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        }
    },
    production: {
        common: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        },
        
        live: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        }
    },
    staging: {
        common: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        },
        
        live: {
            SQULPTR_BASE_URL: 'https://squlptr-api-staging.herokuapp.com/api'
        }
    }
};

const config = configMap[process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : 'dev'];

let currentUserEnv = dataStore.get(DATA_STORE_KEYS.APP_ENVIRONMENT);
currentUserEnv = currentUserEnv === null ? true : currentUserEnv

const commonConfig = config["common"] || {};
const envConfig = currentUserEnv ? config["live"] : config["test"];

export default {
    // Add common config values here
    ...commonConfig,
    ...envConfig
};
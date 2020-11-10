/*
* Copyright (C) 2019 Intel Corporation
* SPDX-License-Identifier: MIT
*/

/* global
    require:false
*/

const Axios = require('axios');
const store = require('store');
Axios.defaults.withCredentials = true;
Axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
Axios.defaults.xsrfCookieName = 'csrftoken';
onmessage = (e) => {
    Axios.get(e.data.url, {
        ...e.data.config,
        headers: {
            'Authorization': `Token ${e.data.token}`,
        }
    })
        .then((response) => {
            postMessage({
                responseData: response.data,
                id: e.data.id,
                isSuccess: true,
            });
        })
        .catch((error) => {
            postMessage({
                id: e.data.id,
                error,
                isSuccess: false,
            });
        });
};

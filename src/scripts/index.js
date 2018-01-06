import React from 'react';
import {render} from 'react-dom';
import Explorer from './components/explorer';

const initialState = {id: '0', name: 'ルート', type: '1'};

render(
    <Explorer node={initialState}/>,
    //document.getElementById('app')
    document.querySelector('.l-content .explorer')
);

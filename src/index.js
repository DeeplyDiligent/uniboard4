import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css';
import App from './App';
import EnableLocalStorage from './pages/enableLocalStorage';

function lsTest(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}


if (!lsTest()) {
    ReactDOM.render(<EnableLocalStorage />, document.getElementById('root'));
}else {
    ReactDOM.render(<App />, document.getElementById('root'));
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import storeApp from './storeApp';


ReactDOM.render(
<Provider store={storeApp}>
    <Router>
    <App />
    </Router>
    </Provider>,
document.getElementById('root')
);


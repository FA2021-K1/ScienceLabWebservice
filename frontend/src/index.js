import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import store from './app/store';

ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>,
  document.getElementById('root')
);


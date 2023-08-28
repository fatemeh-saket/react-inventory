import ReactDOM from 'react-dom/client';
import './index.css';
import ContextProviderWrapper from './Store/ContextProviderWrapper'
import 'react-perfect-scrollbar/dist/css/styles.css';
import Routing from './Routing'
import { Provider } from 'react-redux';
import store from './Store/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
        <ContextProviderWrapper>
            <Routing />
        </ContextProviderWrapper>
    </Provider>

);



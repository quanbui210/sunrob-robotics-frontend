import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, {persistor} from './store/index';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';


console.log(persistor);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
</Provider>);


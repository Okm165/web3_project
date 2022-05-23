/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

import App from './App';
import { TransactionProvider } from './context/TransactionContext'

render(() =>
    <TransactionProvider>
        <App />
    </TransactionProvider>
    , document.getElementById('root') as HTMLElement
);

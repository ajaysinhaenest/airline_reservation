import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import RootStore from './Shared/Stores/root.store'
import { Provider } from 'mobx-react'

const rootStore = new RootStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Provider {...rootStore}>
            <App />
        </Provider>
    </React.StrictMode>,
)

reportWebVitals()

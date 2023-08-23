import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "./providers/AuthProvider.tsx";
import {GroupsProvider} from "./providers/GroupsProvider.tsx";
import {ClockProvider} from "./providers/ClockProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ClockProvider>
            <AuthProvider>
                <GroupsProvider>
                    <App/>
                </GroupsProvider>
            </AuthProvider>
        </ClockProvider>
    </React.StrictMode>,
)

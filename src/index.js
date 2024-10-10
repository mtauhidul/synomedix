import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import FishboneProvider from './context/FishboneContext';
import PatientsProvider from './context/PatientsContext';
import SidebarProvider from './context/SidebarContext';
import UserProvider from './context/UserContext';
import VitalProvider from './context/VitalContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <PatientsProvider>
          <FishboneProvider>
            <VitalProvider>
              <UserProvider>
                <App />
              </UserProvider>
            </VitalProvider>
          </FishboneProvider>
        </PatientsProvider>
      </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>
);

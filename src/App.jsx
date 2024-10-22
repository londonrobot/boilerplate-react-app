import './App.css';
import { Account } from './components/Account';
import { SomethingWithMatter } from './components/SomethingWithMatter';
import { AuthForm } from './components/AuthForm';
import { ContextUser } from './context/ContextUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { Page1 } from './components/Page1';
import { Page2 } from './components/Page2';

const queryClient = new QueryClient();


const App = () => {
  const [userId, setUserId] = useState('');

  const updateUserId = (newUserId) => {
    console.log('update user', newUserId);
    setUserId(newUserId);
  };

  return (
    <BrowserRouter>
      <ContextUser.Provider value={{ 
        userId: userId,
        updateUserId
      }}>
        <QueryClientProvider client={queryClient}>
          <SomethingWithMatter>
            <Routes>
              <Route path="/" element={userId ? <Account /> : <AuthForm />} />
              <Route path="/page1" element={userId ? <Page1 /> : <AuthForm />} />
              <Route path="/page2" element={userId ? <Page2 /> : <AuthForm />} />
            </Routes>
          </SomethingWithMatter>
        </QueryClientProvider>
      </ContextUser.Provider>
    </BrowserRouter>
  );
};

export default App;
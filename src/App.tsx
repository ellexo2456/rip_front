import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AlpinistsPage from "./AlpinistsPage/AlpinistsPage";
import AlpinistPage from "./AlpinistPage/alpinistPage";
import Header from "./Header.tsx";
import { LoginPage } from "./AuthorizationPage/LoginPage.tsx";
import { RegisterPage } from "./AuthorizationPage/RegisterPage.tsx";
import { ExpeditionPage } from "./ExpeditionPage/ExpeditionPage.tsx";
import { Provider } from "react-redux";
import { HistoryPage } from "./HistoryPage/HistoryPage.tsx";
import { store } from "./core/store/index.ts";
import { MainLayout } from "./components/MainLayout/index.tsx";
import { getExpeditions } from "./core/api/expedition/index.ts";
import { saveAuth } from "./core/store/slices/userSlice.ts";
import Breadcrumbs from "./Breadcrumbs.tsx";


const App: React.FC = () => {
  useEffect(() => {
    getExpeditions().then(() => store.dispatch(saveAuth(true)));
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Header></Header>
          <Breadcrumbs />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/rip_front" element={<AlpinistsPage />} />
            <Route path="/rip_front/alpinist/:id" element={<AlpinistPage />} />
            <Route path="/rip_front/login" element={<LoginPage />} />
            <Route path="/rip_front/register" element={<RegisterPage />} />
            <Route path="/rip_front/missions/:id" element={<ExpeditionPage />} />
            <Route path="/rip_front/history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

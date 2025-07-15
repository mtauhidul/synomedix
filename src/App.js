import { Route, Routes } from "react-router-dom";
import "./App.css";
import useWindowSize from "./hooks/useWindowSize";
import Layout from "./Layout";
import SettingLayout from "./Layout/SettingLayout";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Setting from "./Pages/Setting";

function App() {
  const { height } = useWindowSize();

  return (
    <div
      className="App"
      style={{
        height: `${height}px`,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/:id"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/setting"
          element={
            <SettingLayout>
              <Setting />
            </SettingLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

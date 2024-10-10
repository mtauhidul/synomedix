import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import useWindowSize from "./hooks/useWindowSize";
import Setting from "./Pages/Setting";
import SettingLayout from "./Layout/SettingLayout";

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

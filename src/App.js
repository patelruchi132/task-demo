import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import { PublicRoutes, PrivateRoutes } from "./routes";
import NonAuth from "./components/layout/NonAuthLayout";
import AuthLayout from "./components/layout/Authlayout";
import { Spin } from "antd";
function App() {
  const isLoggedIn = true;

  return (
    <Routes>
      {PublicRoutes.map(({ path, exact, component: Component }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          element={
            <Suspense fallback={<div className="flex justify-center items-center h-screen"><Spin size="large" /></div>}>
              <NonAuth>
                <Component />
              </NonAuth>
            </Suspense>
          }
        />
      ))}
      <Route path="/" exact element={<AuthLayout />}>
        {PrivateRoutes.map(({ path, exact, component: Component }) => {
          return isLoggedIn ? (
            <Route
              key={path}
              path={path}
              exact={exact}
              element={<Component />}
            />
          ) : (
            <Route
              key={path}
              path={path}
              exact={exact}
              element={<Navigate to="/login" />}
            />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;

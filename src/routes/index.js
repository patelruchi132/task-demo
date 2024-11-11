import { lazy } from "react";

const PublicRoutes = [
    {
      path: "/login",
      component: lazy(() => import("../pages/Login/index")),
      exact: true,
    },
  
    // All the public routes
  ];
  
  const PrivateRoutes = [
   {
      path: "/",
      component: lazy(() => import("../pages/Home")),
      exact: true,
    
    },
    {
      path: "/detail/:id",
      component: lazy(() => import("../pages/Detail")),
      exact: true,
    }
   
  ];
  
  export { PublicRoutes, PrivateRoutes };
  
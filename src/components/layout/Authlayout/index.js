import React, { Suspense, useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import { Outlet, } from "react-router-dom";
import {  BulbOutlined } from '@ant-design/icons';


const { Content } = Layout;

const AuthLayout = () => {
  const [isDarkMode,setIsDarkMode]=useState(false)
 
  return (
    <Layout className="min-h-screen">
      <Content className=" ">
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><Spin size="large" /></div>}>
          <Outlet />
        </Suspense>
      </Content>

    </Layout>
  );
};

export default AuthLayout;

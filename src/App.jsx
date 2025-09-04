import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./navComponents/Navbar";
import Home from "./navComponents/Home";
import Paste from "./navComponents/Paste";
import ViewPaste from "./navComponents/ViewPaste";


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-1 flex justify-center items-start pt-10 px-4">
        <Outlet />
      </main>
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/pastes", element: <Paste /> },
        { path: "/pastes/:id", element: <ViewPaste /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

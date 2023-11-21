import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewProduct from "./pages/newProduct/NewProduct";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";
import { productColumns, orderColumns } from "./datatablesource";
import Error from "./components/error/Error";
import Chat from "./pages/chat/Chat";
import { useEffect } from "react";
import axios from "axios";
import { api } from "./api/api";
function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  useEffect(() => {
    axios
      .get(api + "/checkSession", { withCredentials: true })
      .then(() => {
        dispatch({ type: "STILL_LOGIN" });
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT" });
      });
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: isLogin ? <Home /> : <Login />,
        },
        {
          path: "products",
          children: [
            { index: true, element: <List columns={productColumns} /> },
            { path: ":idProduct", element: <List /> },
            { path: "new", element: <NewProduct /> },
          ],
        },
        { path: "orders", element: <List columns={orderColumns} /> },
        { path: "chat", element: <Chat /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

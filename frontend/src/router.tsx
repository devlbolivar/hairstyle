import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrders from "./pages/PlaceOrders";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import OrderList from "./pages/admin/OrderList";
import ProductList from "./pages/admin/ProductList";
import ProductEdit from "./pages/admin/ProductEdit";
import UserList from "./pages/admin/UserList";
import UserEdit from "./pages/admin/UserEdit";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<PlaceOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderList" element={<OrderList />} />
        <Route path="/admin/productList" element={<ProductList />} />
        <Route
          path="/admin/productList/:pageNumber"
          element={<ProductList />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/userList" element={<UserList />} />
        <Route path="/admin/user/:id/edit" element={<UserEdit />} />
      </Route>
    </Route>
  )
);

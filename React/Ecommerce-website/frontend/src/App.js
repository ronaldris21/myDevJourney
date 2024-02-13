import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import SingleService from "./screens/SingleService";
import NewServiceScreen from "./screens/admin-views/NewServiceScreen";
import ServicesAdminScreen from "./screens/admin-views/ServicesAdminScreen";
import Portfolio from "./screens/Portfolio";
import Servicios from "./screens/Servicios";
import AllOrdersScreen from "./screens/admin-views/AllOrdersScreen";

const App = () => {
  return (
    <Router>
      <Switch>
        
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pagenumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route path="/products/:id" component={SingleService} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/servicios" component={Servicios} />


        {/* admin only views */}
        <PrivateRouter path="/admin/orders" component={AllOrdersScreen} />
        <PrivateRouter path="/admin" component={ServicesAdminScreen} />
        <PrivateRouter path="/new-service/:id" component={NewServiceScreen} />
        <PrivateRouter path="/edit-service/:id" component={NewServiceScreen} />



        {/* generic route */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;

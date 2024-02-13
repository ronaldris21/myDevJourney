// ********* OnlineShop Website is created by Zpunet ******************
// ********* If you get an error please contact us ******
// ******** Email:minahmmassy@gmail.com *********
// ********* Website:www.codemarketi.com *********
// ********* Phone:+255 65 535 2744 *********
// ********* Youtub Channel: https://www.youtube.com/channel/UCOYwYO-LEsrjqBs6xXSfq1w *********

// ******** Support my work with *********
// ********* https://www.patreon.com/zpunet *********
// ********* https://www.buymeacoffee.com/zpunet *********

// ********* This is the main component of the website *********
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import Shop from './screens/Shop';
import FAQPage from './screens/FAQ';
import PrivacyPolicy from './screens/Privacy';
import TermAndConditions from './screens/TermsCondition';
import OrderScreen from './screens/OrderScreen';
import Dashboard from './screens/Dashboard/Dashboard';
import Orders from './screens/Dashboard/Orders';
import UpdateProfile from './screens/Dashboard/UpdateProfile';
import Password from './screens/Dashboard/Password';
import ScrollToTop from './ScrollOnTop';
import NotFound from './screens/NotFound';
import { PopUpProvider } from './Context/PopUpContex';
import ProductDetails from './screens/ProductDetails';
import ToastContainer from './components/Notifications/Toaster';
import RegistationScreen from './screens/Dashboard/RegistationScreen';
import { ProtectedRouter } from './ProtectedRoutes';
import OrderSuccess from './screens/OrderSuccess';

function App() {
  AOS.init();
  return (
    <PopUpProvider>
      <ToastContainer />
      <ScrollToTop>
        <Routes>
          {/* PROTECTED */}
          <Route element={<ProtectedRouter />}>
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<UpdateProfile />} />
            <Route path="/password" element={<Password />} />
            <Route path="/success" element={<OrderSuccess />} />
          </Route>
          {/* PUBLIC */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/card/:id" element={<ProductDetails />} />
          <Route path="/registation" element={<RegistationScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms-condition" element={<TermAndConditions />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
    </PopUpProvider>
  );
}

export default App;

import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { CgUser } from 'react-icons/cg';
import { Link, NavLink } from 'react-router-dom';
import { SidebarContext } from '../../Context/PopUpContex';
import Cart from '../../components/Drawer/Cart';
import { useSelector } from 'react-redux';
import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi';
import { BiMenu } from 'react-icons/bi';
import { HiOutlineUser } from 'react-icons/hi';
import MobileDrawer from '../../components/Drawer/MobileDrawer';

const Navbar = () => {
  const {
    toggleCartDrawer,
    cartDrawerOpen,
    setSearch,
    submitHandler,
    search,
    mobileDrawerOpen,
    toggleMobileDrawer,
  } = useContext(SidebarContext);
  const hover = 'hover:text-main transitions';
  const Hover = ({ isActive }) => (isActive ? 'text-main' : hover);

  // states
  const {
    wishlists: { wishlist },
    userLogin: { userInfo },
  } = useSelector((state) => state);

  return (
    <>
      <MobileDrawer
        mobileDrawerOpen={mobileDrawerOpen}
        toggleMobileDrawer={toggleMobileDrawer}
      />
      <Cart
        cartDrawerOpen={cartDrawerOpen}
        closeCartDrawer={toggleCartDrawer}
      />
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto py-4 px-2 gap-10 lg:grid grid-cols-7 justify-between items-center">
          <div className="col-span-1 flex-btn flex-wrap lg:pb-0 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMobileDrawer}
                className="lg:hidden block text-2xl"
              >
                <BiMenu />
              </button>
              <Link to="/">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="lg:w-full h-12 w-32 object-contain"
                />
              </Link>
            </div>
            <div className="flex lg:hidden items-center gap-4 pr-2">
              <NavLink
                to={userInfo ? '/dashboard' : '/registation'}
                className={`${Hover} text-2xl`}
              >
                <HiOutlineUser />
              </NavLink>
              <button onClick={toggleCartDrawer} className={`text-xl relative`}>
                <div className="w-5 h-5 flex-colo rounded-full text-[10px] bg-flash text-white absolute -top-3 -right-2">
                  {wishlist?.length}
                </div>

                <FiShoppingBag />
              </button>
            </div>
          </div>
          <div className="col-span-3">
            <form
              onSubmit={(e) => submitHandler(e)}
              className="w-full bg-dryGray rounded flex gap-4 justify-between"
            >
              <button
                type="submit"
                className="w-12 transitions hover:bg-subMain flex-colo text-xs h-10 md:text-sm md:h-12 rounded bg-main text-white"
              >
                <FaSearch />
              </button>
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Search dress, skirt, top, necklace..."
                className="font-semibold text-xs md:text-sm w-11/12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>
          <div className="col-span-3 font-bold hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink className={Hover} to="/shop">
              Shop
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <NavLink
              to={userInfo ? '/dashboard' : '/registation'}
              className={Hover}
            >
              <CgUser className="w-8 h-8" />
            </NavLink>
            <button onClick={toggleCartDrawer} className={`${hover} relative`}>
              <FiShoppingCart className="w-6 h-6" />
              <div className="w-6 h-6 flex-colo rounded-full text-[10px] bg-flash text-white absolute -top-5 -right-3">
                {wishlist?.length}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;

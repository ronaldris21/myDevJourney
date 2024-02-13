import React, { useState, useMemo, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

// create context
export const SidebarContext = createContext();

export const PopUpProvider = ({ children }) => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/shop?search=${search}`);
      setSearchValue(search);
      setSearch('');
    }
  };

  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen);
  const closeCartDrawer = () => setCartDrawerOpen(false);

  const toggleMobileDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const closeMobileDrawer = () => setMobileDrawerOpen(false);

  const toggleMobileFilter = () => setMobileFilterOpen(!mobileFilterOpen);
  const closeMobileFilter = () => setMobileFilterOpen(false);

  const value = useMemo(
    () => ({
      cartDrawerOpen,
      toggleCartDrawer,
      closeCartDrawer,
      mobileDrawerOpen,
      toggleMobileDrawer,
      closeMobileDrawer,
      mobileFilterOpen,
      toggleMobileFilter,
      closeMobileFilter,
      search,
      setSearch,
      submitHandler,
      searchValue,
      setSearchValue,
    }),

    [cartDrawerOpen, mobileDrawerOpen, mobileFilterOpen, search, searchValue]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

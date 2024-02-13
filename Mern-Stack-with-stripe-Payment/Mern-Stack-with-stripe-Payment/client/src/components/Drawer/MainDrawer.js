import React from 'react';
import Drawer from 'rc-drawer';

const MainDrawer = ({ DrawerOpen, closeDrawer, children }) => {
  return (
    <Drawer
      open={DrawerOpen}
      onClose={closeDrawer}
      handler={false}
      level={null}
      placement="right"
    >
      {children}
    </Drawer>
  );
};
export default MainDrawer;

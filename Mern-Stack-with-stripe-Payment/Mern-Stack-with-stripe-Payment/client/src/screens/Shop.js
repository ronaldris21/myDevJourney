import React from 'react';
import Layout from '../layout/Layout';
import Promos from './../components/Promos';
import SidebarFilter from '../components/SidebarFilter';

function Shop() {
  //  get query /shop?category=category from url

  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');

  console.log(category);

  return (
    <Layout header={true}>
      {/* filter button */}
      <div className="min-h-screen container mx-auto px-4 my-6">
        <div className="my-12 lg:block hidden">
          <Promos />
        </div>

        <SidebarFilter category={category} />
      </div>
    </Layout>
  );
}

export default Shop;

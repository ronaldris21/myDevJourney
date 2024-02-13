import React from 'react';
import Titles from '../Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Products from '../Products';
import { CardLoader } from '../Notifications/Loader';

function PopularProducts({ datas, loading }) {
  const Product = datas?.sort(() => Math.random() - Math.random()).slice(0, 6);
  return (
    <div className="sm:my-20 my-8">
      <Titles title="Popular Cards" Icon={BsCollectionFill} />
      <div
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-delay="10"
        data-aos-duration="1000"
        className="grid sm:mt-10 mt-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"
      >
        {loading || Product?.length === 0
          ? // number of slides
            Array.from(Array(6).keys()).map((s, i) => <CardLoader key={i} />)
          : Product?.map((p) => (
              <Products bg={false} key={p._id} product={p} />
            ))}
      </div>
    </div>
  );
}

export default PopularProducts;

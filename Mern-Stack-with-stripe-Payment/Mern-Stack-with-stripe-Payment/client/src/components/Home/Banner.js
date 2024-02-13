import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../../Context/PopUpContex';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Banners } from '../../Data/BannerData';

function Banner() {
  const { setSearch, submitHandler, search } = useContext(SidebarContext);

  // states
  const {
    categoriesList: { categories },
  } = useSelector((state) => state);

  return (
    <>
      {/* comp */}
      <div className=" bg-main relative">
        <Swiper
          navigation={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={2000}
          modules={[Autoplay]}
          slidesPerView={1}
          className="z-0 lg:h-[600px] sm:h-[500px] h-[400px] w-full"
          direction={'vertical'}
          loop={true}
        >
          {Banners.map((item) => (
            <SwiperSlide key={item}>
              <img
                src={item}
                alt={'Banner'}
                className="w-full h-full  object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="z-30 bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 flex-colo">
          {' '}
          <div className="container mx-auto lg:px-32 px-4">
            {/* header */}

            {/* hero */}
            <div className="flex-colo gap-4 text-center">
              <h1 className="text-3xl font-semibold md:font-medium text-white">
                All the assets you need, in one place
              </h1>
              <p className="text-white sm:text-base text-sm">
                Shop clothes, accessories, and more from independent sellers
                around the world.
              </p>
              {/* search */}
              <form
                onSubmit={(e) => submitHandler(e)}
                className="flex-btn gap-2 w-full lg:w-7/12 bg-white rounded-md overflow-hidden p-2"
              >
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search swimware, laptop, Iphone, and more...."
                  className="w-8/12 px-4 py-2 border-none outline-none text-sm"
                />
                <button
                  type="submit"
                  className="bg-main text-white px-4 py-3 rounded-md"
                >
                  <FaSearch />
                </button>
              </form>
              {/* categories */}
              <div className="mt-6 w-8/12 hidden sm:flex justify-center items-center flex-wrap gap-4">
                {categories?.slice(0, 5).map((item) => (
                  <Link
                    key={item?.id}
                    to="/"
                    className="bg-opacity-20 text-xs py-2 px-4 text-white bg-white rounded-md"
                  >
                    {item?.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;

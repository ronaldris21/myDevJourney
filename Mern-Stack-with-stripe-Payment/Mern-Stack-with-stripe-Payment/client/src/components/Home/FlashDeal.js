import React, { useState } from 'react';
import { MdLocalOffer } from 'react-icons/md';
import Titles from '../Titles';
import { FaShareAlt } from 'react-icons/fa';
import {
  BsCaretLeftFill,
  BsCaretRightFill,
  BsFillEyeFill,
} from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ShareMovieModal from '../Modals/ShareModal';
import { useNavigate } from 'react-router-dom';
import { OfferLoader } from '../Notifications/Loader';

function FlashDeal({ datas, loading }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  const classNames =
    'hover:bg-main transitions hover:text-white rounded-full w-10 h-10 flex-colo bg-subMain text-white shadow-xl';

  const buttons = [
    {
      id: 2,
      ttile: 'View Card',
      icon: (f) => {
        return <BsFillEyeFill />;
      },
      onClick: (f) => {
        navigate(`/card/${f?._id}`);
      },
    },
    {
      id: 3,
      ttile: 'Share Card',
      icon: (f) => {
        return <FaShareAlt />;
      },
      onClick: (f) => {
        setCard(f);
        setModalOpen(!modalOpen);
      },
    },
  ];

  return (
    <>
      {modalOpen && (
        <ShareMovieModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          card={card}
        />
      )}
      <div className="my-12">
        <Titles title="Flash Deals" Icon={MdLocalOffer} />
        <div className="mt-10">
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation={{ prevEl, nextEl }}
            speed={1000}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },

              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1550: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {loading || datas?.length === 0
              ? // number of slides
                Array.from(Array(10).keys()).map((s, i) => (
                  <SwiperSlide key={i}>
                    <OfferLoader />
                  </SwiperSlide>
                ))
              : datas?.map((f) => (
                  <SwiperSlide key={f?._id}>
                    <div className="rounded-lg z-10 group hover:shadow-lg transitions overflow-hidden relative">
                      <div className="bg-deepGray cursor-pointer rounded w-full h-96 relative">
                        <img
                          alt={f?.title}
                          src={
                            f?.images?.length > 0
                              ? f?.images[0]
                              : 'https://via.placeholder.com/150'
                          }
                          className="w-full hover:scale-105 transitions h-full object-cover"
                        />
                        <div className="absolute top-3 text-xs py-1 px-3 font-bold left-3 bg-flash rounded-full text-white">
                          {f?.salesOffer?.discount}% OFF
                        </div>
                      </div>
                      <div
                        className={`absolute top-0 bottom-0 left-0  right-0 bg-black bg-opacity-30 group-hover:flex hidden flex-col p-6 gap-4`}
                      >
                        {buttons.map((button) => (
                          <button
                            title={button.ttile}
                            key={button.id}
                            onClick={() => button.onClick(f)}
                            className={` w-8 h-8 text-sm flex-colo transitions hover:bg-main hover:text-white rounded-md bg-white text-main`}
                          >
                            {
                              // button.icon
                              button.icon(f)
                            }
                          </button>
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

            <div className="w-full px-1 z-50 absolute top-2/4 justify-between flex">
              <button className={classNames} ref={(node) => setPrevEl(node)}>
                <BsCaretLeftFill />
              </button>
              <button className={classNames} ref={(node) => setNextEl(node)}>
                <BsCaretRightFill />
              </button>
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default FlashDeal;

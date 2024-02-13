import React, { useEffect } from 'react';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import FlashDeal from '../components/Home/FlashDeal';
import PopularProducts from '../components/Home/PopularProducts';
import Promos from '../components/Promos';
import Layout from '../layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesAction } from '../Redux/Actions/catAction';
import { toast } from 'react-hot-toast';
import { getCardsAction } from '../Redux/Actions/CardAction';

function HomeScreen() {
  const dispatch = useDispatch();
  const {
    categoriesList: { categories, loading, error },
    getAllCards: { products, loading: cardLoading, error: cardError, offers },
  } = useSelector((state) => state);

  // get all categories
  useEffect(() => {
    dispatch(getCategoriesAction());
    dispatch(
      getCardsAction({
        pageNumber: 1,
        category: '',
        search: '',
        sort: '',
        tag: '',
      })
    );
  }, [dispatch]);
  // error handling
  useEffect(() => {
    if (error || cardError) {
      toast.error(error || cardError);
      dispatch({ type: error ? 'CATEGORY_LIST_RESET' : 'PRODUCT_LIST_RESET' });
    }
  }, [error, dispatch, cardError]);

  return (
    <Layout header={true}>
      <Banner />
      <div className="min-h-screen container mx-auto xl:px-32 px-4 my-6">
        <Categories categories={categories} loading={loading} />
        <PopularProducts datas={products} loading={cardLoading} />
        <div className="mb-20">
          <Promos />
        </div>
        <FlashDeal datas={offers} loading={loading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;

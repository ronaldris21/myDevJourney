import React, { useContext, useEffect, useMemo, useState } from 'react';
import Filter from './Filter';
import Products from './Products';
import { BiFilter } from 'react-icons/bi';
import { SidebarContext } from '../Context/PopUpContex';
import FilterDrawer from './Drawer/FilterDrawer';
import { toast } from 'react-hot-toast';
import { CardLoader } from './Notifications/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCardsAction, getTagsAction } from '../Redux/Actions/CardAction';
import { getCategoriesAction } from '../Redux/Actions/catAction';

function SidebarFilter({ category }) {
  const { mobileFilterOpen, toggleMobileFilter, searchValue, setSearchValue } =
    useContext(SidebarContext);
  const [published, setPublished] = useState({});
  const [categor, setCategor] = useState({});
  const [tag, setTag] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  // states
  const {
    getAllCards: { products, loading, error, page, pages },
    categoriesList: { categories, error: catError },
    allTags: { tags, error: tagError },
  } = useSelector((state) => state);

  // queries
  const queries = useMemo(() => {
    const query = {
      search: searchValue ? searchValue : '',
      category: categor?.value ? categor?.value : '',
      sort: published.value ? published.value : '',
      tag: tag?.value ? tag?.value : '',
    };
    return query;
  }, [searchValue, categor, published, tag]);

  // load more
  const HandleLoadMore = (value) => {
    if (value === 'next') {
      setPageNumber((prev) => prev + 1);
    } else {
      setPageNumber((prev) => prev - 1);
    }
  };

  // get all categories
  useEffect(() => {
    dispatch(getCategoriesAction());
    dispatch(getTagsAction());
  }, [dispatch]);

  useEffect(() => {
    // check if category is in url
    if (category) {
      setCategor({ title: category, value: category });
    }
  }, [category]);

  // get all cards
  useEffect(() => {
    dispatch(getCardsAction({ ...queries, pageNumber }));
  }, [dispatch, queries, pageNumber]);

  // error handling
  useEffect(() => {
    if (error || catError || tagError) {
      toast.error(error || catError || tagError);
      dispatch({
        type: catError
          ? 'CATEGORY_LIST_RESET'
          : error
          ? 'PRODUCT_LIST_RESET'
          : 'TAGS_PRODUCT_RESET',
      });
    }
  }, [error, dispatch, catError, tagError]);

  // clear filters
  const clearFilters = (states) => {
    setPublished({});
    setCategor({});
    setTag({});
    setPageNumber(1);
    setSearchValue('');
    states?.setActivePublish(null);
    states?.setActiveTag(null);
    states?.setActiveCategory(null);
  };

  return (
    <>
      <FilterDrawer
        filterDrawerOpen={mobileFilterOpen}
        toggleFilterDrawer={toggleMobileFilter}
      />
      <button
        onClick={toggleMobileFilter}
        className="fixed lg:hidden shadow-lg top-[90px] right-2 z-50 border-main border bg-white text-main rounded-full h-12 w-12 flex justify-center items-center"
      >
        <BiFilter className="text-3xl" />
      </button>
      {/* menu */}
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2 lg:block hidden">
          <Filter
            button={false}
            categories={categories}
            states={{
              published: published,
              category: categor,
              setCategory: setCategor,
              setPublished: setPublished,
              tag: tag,
              setTag: setTag,
            }}
            tags={tags}
            functions={{
              SidebarFilter: () => {},
              clearFilters: clearFilters,
            }}
          />
        </div>
        <div className="lg:col-span-10 col-span-12">
          <div className="grid xl:grid-cols-3  lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3">
            {loading
              ? // number of slides
                Array.from(Array(12).keys()).map((s, i) => (
                  <CardLoader key={i} />
                ))
              : products?.map((p) => (
                  <Products bg={true} key={p._id} product={p} />
                ))}
          </div>
          {pages > 1 && (
            <div className="w-full flex-rows gap-4 my-12">
              <button
                disabled={page === 1}
                onClick={() => HandleLoadMore('prev')}
                className="flex-rows gap-3 text-white py-3 px-4 text-xs rounded font-semibold bg-main"
              >
                Prev
              </button>
              <button
                disabled={pages && pages === page}
                onClick={() => HandleLoadMore('next')}
                className="flex-rows gap-3 text-white py-3 px-4 text-xs rounded font-semibold bg-main"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SidebarFilter;

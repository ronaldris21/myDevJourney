import React, { useContext, useMemo, useState } from 'react';
import MainDrawer from './MainDrawer';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import Filter from '../Filter';
import { useDispatch, useSelector } from 'react-redux';
import { getCardsAction } from '../../Redux/Actions/CardAction';
import { SidebarContext } from '../../Context/PopUpContex';

function FilterDrawer({ filterDrawerOpen, toggleFilterDrawer }) {
  const { setSearchValue, searchValue } = useContext(SidebarContext);
  const [published, setPublished] = useState({});
  const [category, setCategory] = useState({});
  const dispatch = useDispatch();
  const [tag, setTag] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const {
    categoriesList: { categories },
    allTags: { tags },
  } = useSelector((state) => state);

  // queries
  const queries = useMemo(() => {
    const query = {
      search: searchValue ? searchValue : '',
      category: category?.value ? category?.value : '',
      sort: published?.value ? published?.value : '',
      tag: tag?.value ? tag?.value : '',
    };
    return query;
  }, [category, published, tag, searchValue]);

  // filter
  const SidebarFilter = () => {
    dispatch(getCardsAction({ ...queries, pageNumber }));
    toggleFilterDrawer();
  };

  // clear filters
  const clearFilters = (states) => {
    setPublished({});
    setCategory({});
    setTag({});
    setPageNumber(1);
    setSearchValue('');
    states?.setActivePublish(null);
    states?.setActiveTag(null);
    states?.setActiveCategory(null);
    dispatch(
      getCardsAction({
        search: '',
        category: '',
        sort: '',
        tag: '',
        pageNumber: 1,
      })
    );
    toggleFilterDrawer();
  };

  return (
    <MainDrawer DrawerOpen={filterDrawerOpen} closeDrawer={toggleFilterDrawer}>
      <div className="flex flex-col w-full h-full justify-between items-middle bg-white rounded cursor-pointer">
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-main text-white border-b border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center">
            <Link onClick={toggleFilterDrawer} to="/">
              <img
                className="w-40 h-40 object-contain"
                src="/images/logo.png"
                alt="logo"
              />
            </Link>
          </h2>
          <button
            onClick={toggleFilterDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-red-500 p-2 focus:outline-none transition-opacity hover:text-red-600"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
        {/* filters */}
        <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full p-12">
          <Filter
            button={true}
            categories={categories}
            tags={tags}
            states={{
              published: published,
              category: category,
              setCategory: setCategory,
              setPublished: setPublished,
              tag: tag,
              setTag: setTag,
            }}
            functions={{
              SidebarFilter: SidebarFilter,
              clearFilters: clearFilters,
            }}
          />
        </div>
      </div>
    </MainDrawer>
  );
}

export default FilterDrawer;

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import iconCart from "../../assets/svg/cart.svg";
import HomeController from "../../controller/home_controller";
import CategoryModel from "../../model/category_model";
import "./navbar.css";
import TabBar from "./TabBar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import debounce from "lodash/debounce";
import {
  setCategories,
  setActiveCategory,
  setSearch,
} from "../../store/category/categorySlice";
import { TFunction } from "i18next";
import TabbarShimmer from "./Tabbarshimmer";
import { useDebounce } from "../../utils/utils";

const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const activeCategory = useSelector(
    (state: RootState) => state.category.activeCategory
  );
  const homCon = React.useRef(new HomeController()).current;
  const [isLoadingCate, setIsLoadingCate] = useState(true);

  const fetchCateogry = async () => {
    try {
      const data = await homCon.fetchCategory();
      data.unshift(new CategoryModel(0, t("all"), "")); // Add "All" category as the first index

      dispatch(setCategories(data));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoadingCate(false);
    }
  };

  useEffect(() => {
    fetchCateogry();
  }, []);

  const handleCategoryClick = (category: CategoryModel) => {
    dispatch(setActiveCategory(category));
    // Optionally: Trigger API call to refresh products
  };

  return (
    <div className="top-0 bg-zinc-100 sticky z-20 pb-0 px-4 pt-4 w-full">
      <nav className="navbar w-[1200px] max-w-full flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-[#FACDCC] truncate min-w-[8rem]"
        >
          RakSmey II
        </Link>
        <div className="m-auto w-full hidden md:block mr-2">{field(t)}</div>
        <div className="p-2 rounded-full bg-slate-800 flex justify-center items-center relative">
          <img src={iconCart} className="" />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
            0
          </span>
        </div>
      </nav>
      <div className="m-auto w-full md:hidden mr-2 mt-1">{field(t)}</div>
      {isLoadingCate ? (
        <TabbarShimmer />
      ) : (
        <TabBar
          tabs={categories}
          onTabClick={handleCategoryClick}
          activeTab={activeCategory}
        />
      )}
    </div>
  );
};

function field(t: TFunction<"translation", undefined>) {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    dispatch(setSearch(query)); // Dispatch action to update the search term
  };
  const debouncedSearch = useDebounce(query, 400);
  useEffect(() => {
    if (window.innerWidth < 768) {
      handleSearch();
    }
  }, [debouncedSearch]);
  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
        >
          <path d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" />
        </svg>

        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder={t("search")}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(); // Trigger search immediately on Enter
            }
          }}
        />

        <button
          className="rounded-md hidden md:block bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Navbar;

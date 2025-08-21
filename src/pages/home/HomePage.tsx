import React, { useEffect, useState } from "react";
import ProductCart from "../../components/card/ProductCard";
import ProductController from "../../controller/ProductController";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ShimmerGrid from "../../components/card/ShimmerCard";
import Loading from "../../components/card/Loading";
import iconUp from "../../assets/svg/ic_up.svg";
const HomePage = () => {
  const activeCategory = useSelector(
    (state: RootState) => state.category.activeCategory
  );
  const txtSearch = useSelector((state: RootState) => state.category.search);
  const [products, setProducts] = useState(
    new ProductController().getProducts()
  );
  const [isNomore, setIsNomore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoadingPagi, setIsLoadingPagi] = useState(false);

  const con = React.useRef(new ProductController()).current;
  const fetchProducts = async (isPagi: boolean) => {
    try {
      con.txtSearch = txtSearch;
      console.log("Search", con.txtSearch);
      if (isPagi) {
        const data = await con.fetchProducts();
        setProducts((prev) => [...prev, ...data]);
      } else {
        const data = await con.onRefresh();
        setProducts((prev) => data);
      }

      setIsNomore(con.isNomore); // Update `isNomore` in state
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleScroll = async () => {
    const winHeight = window.innerHeight;
    const doc = document.documentElement;
    setShowScrollTop(doc.scrollTop > 200);
    if (winHeight + doc.scrollTop + 1 >= doc.scrollHeight) {
      if (isLoadingPagi || con.isNomore) return;
      setIsLoadingPagi(true);
      await fetchProducts(true);
      setIsLoadingPagi(false);
    }
  };

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    const fetchPro = async (isPagi: boolean) => {
      setIsLoading(true);
      await fetchProducts(isPagi);
      setIsLoading(false);
    };
    window.scrollTo(0, 0);
    if (activeCategory !== null) {
      con.activeCategory = activeCategory.id;
      console.log("activeCategory", con.activeCategory);
      fetchPro(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory, txtSearch]);

  return (
    <>
      {isLoading ? (
        <ShimmerGrid />
      ) : (
        <>
          <div className="flex justify-center ">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 py-5">
              {products.map((product, key) => (
                <ProductCart key={key} data={product} />
              ))}
            </div>
          </div>

          {isLoadingPagi && <Loading />}
          {isNomore && (
            <p className="text-center mb-3">No more products available.</p>
          )}
          {/* Scroll to Top Button */}
          {
            <button
              onClick={scrollToTop}
              className={`fixed bottom-4 right-4  bg-[#f8c0bf8d] text-white p-3 border-white border-2 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            >
              <img src={iconUp}></img>
            </button>
          }
        </>
      )}
    </>
  );
};

export default HomePage;

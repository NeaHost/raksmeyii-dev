import React, { useEffect, useState } from "react";
import { ProductModel } from "../../model/product_model";
import { useParams, useNavigate } from "react-router-dom";
import ProductController from "../../controller/ProductController";
import { ENV } from "../../Env";
import noImg from "../../assets/image/noimg.jpg";
import { SupabaseImage } from "../../db/storageSupabase";
const ProductDetail = () => {
  const [detail, setDetail] = useState<ProductModel>();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const con = React.useRef(new ProductController()).current;

  const fetchProducts = async () => {
    try {
      if (slug) {
        const data = (await con.fetchProductDetail(
          Number.parseInt(slug)
        )) as ProductModel;

        setDetail(data);
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      setIsLoading(false);
    };

    fetchData();
  }, [slug]);

  return (
    <div className="px-4 py-6 w-[1200px] max-w-full mx-auto  h-[100vh]  bg-white">
      {/* Back Button */}
      <header className="flex justify-between items-center pb-2 mb-4 border-b">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <h2 className="text-2xl font-bold">PRODUCT DETAIL</h2>
        <div className="w-5"></div>
      </header>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Photo */}
          <div className="flex justify-center">
            <img
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = noImg;
              }}
              src={`${SupabaseImage.getImageUrl(detail?.photo ?? "")}`}
              alt={detail?.pName}
              className="w-[40vh] h-[40vh] rounded-xl shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold uppercase">{detail?.pName}</h1>
            <p className="text-3xl font-semibold text-green-600">
              ${detail?.priceOut?.toFixed(2)}
            </p>
            <p className="text-gray-600">{detail?.description}</p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button className="bg-gray-100 h-10 w-10 font-bold text-xl rounded-xl flex justify-center items-center">
                  -
                </button>
                <span className="bg-gray-200 h-10 w-10 font-bold text-xl rounded-xl flex justify-center items-center">
                  {detail?.qty}
                </span>
                <button className="bg-gray-100 h-10 w-10 font-bold text-xl rounded-xl flex justify-center items-center">
                  +
                </button>
              </div>
              <button className="bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl hover:bg-slate-800 transition">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

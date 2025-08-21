import React from "react";
import { ProductModel } from "../../model/product_model";
import { Link } from "react-router-dom";
import { ENV } from "../../Env";
import noImg from "../../assets/image/noimg.jpg";
import iconCart from "../../assets/svg/cart.svg";
import "./product.css";
import { fmCurrency } from "../../utils/utils";
import { SupabaseImage } from "../../db/storageSupabase";
interface ProductCardProps {
  data: ProductModel;
}

function ProductCard({ data }: ProductCardProps) {
  return (
    <Link to={`${data.pId}`}>
      <div className="product-card bg-white p-2 relative z-0 rounded-xl shadow-sm h-[20.2rem] justify-between flex flex-col ">
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
          <img
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = noImg;
            }}
            src={SupabaseImage.getImageUrl(data.photo ?? "")}
            alt={data.pName}
            className="w-80 h-full object-contain" // Prevent cropping and ensure uniform image size
          />
        </div>

        <h5 className="text-sm pt-2 text-center text-orange-400 truncate">
          {data.categoryName}
        </h5>
        <h3 className="text-lg pb-2 text-center h-[15%] font-medium line-clamp-2 break-all">
          {data.pName}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-green-400 text-xl font-bold">
            {fmCurrency(data?.priceOut ?? 0)}
          </span>

          <button
            className="bg-slate-800 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              alert("Add to cart");
            }}
          >
            <img src={iconCart} alt="" className="w-5" />
            <p className="text-white hidden sm:block "> Add To Cart</p>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

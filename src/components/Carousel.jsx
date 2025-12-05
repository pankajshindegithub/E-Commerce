import React, { useEffect } from "react";
import { getData } from "../Context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const { data, fetchAllProducts } = getData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // CUSTOM ARROWS
  const SamplePrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="
        absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer
        bg-red-500 p-3 rounded-full shadow-lg hover:bg-red-600 transition
      "
    >
      <AiOutlineArrowLeft size={22} color="white" />
    </div>
  );

  const SampleNextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="
        absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer
        bg-red-500 p-3 rounded-full shadow-lg hover:bg-red-600 transition
      "
    >
      <AiOutlineArrowRight size={22} color="white" />
    </div>
  );

  // SLIDER SETTINGS
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2500,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="w-full p-0 m-0 overflow-hidden">
      {/* SLIDER START */}
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
          >
            <div
              className="
                flex flex-col md:flex-row items-center justify-center
                gap-10 px-4
                h-auto md:h-[600px]
                my-0 py-6
              "
            >
              {/* LEFT TEXT */}
              <div className="md:space-y-6 space-y-3 text-center md:text-left max-w-md md:max-w-lg">
                <h3 className="text-red-400 font-semibold text-xs sm:text-sm">
                  Powering Your World with the Best in E-Commerce Platform
                </h3>

                <h1
                  className="
                    text-3xl sm:text-4xl lg:text-5xl
                    font-bold uppercase text-white
                  "
                >
                  {item.title}
                </h1>

                <p className="text-gray-300 text-sm sm:text-base line-clamp-3">
                  {item.description}
                </p>

                <button
                  onClick={() => navigate("/products")}
                  className="
                    bg-gradient-to-r from-red-500 to-purple-600 
                    text-white px-6 py-3 rounded-xl 
                    text-base sm:text-lg font-semibold
                    hover:opacity-90 transition cursor-pointer
                  "
                >
                  Shop Now
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="flex justify-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="
                    w-[230px] sm:w-[330px] md:w-[430px] lg:w-[500px]
                    rounded-full bg-white shadow-2xl shadow-red-400
                    hover:scale-105 transition-all
                  "
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* CATEGORY SECTION */}
      <Category />
    </div>
  );
};

export default Carousel;

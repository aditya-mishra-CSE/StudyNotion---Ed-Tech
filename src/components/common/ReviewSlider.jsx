import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

import StarRatings from "react-star-ratings";

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/api";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (data?.success) {
          setReviews(data?.data);
          console.log("Printing Reviews", data?.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-[650px] lg:max-w-[1260px]">
        <Swiper
          breakpoints={{
            // Configure the number of slides per view for different screen sizes
            640: {
              slidesPerView: 1, // Show 1 slide at a time on smaller screens
            },
            768: {
              slidesPerView: 2, // Show 2 slides at a time on screens wider than 768px
            },
            1024: {
              slidesPerView: 4, // Show 4 slides at a time on screens wider than 1024px
            },
          }}
          spaceBetween={25}
          loop={true}
          freeMode={true}
        //   navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}

          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-[#161D29] p-3 text-[14px] text-[#DBDDEA] h-[180px] glass-bg"> 
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="Profile Pic"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-[#F1F2FF] capitalize">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-[#585D69]">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  <p className="font-medium text-[#DBDDEA]">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>

                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-[#E7C009]">
                      {review.rating}
                    </h3>
                    <StarRatings
                      rating={Number(review.rating) || 0} // Ensure it's a number
                      starRatedColor="#ffd700"
                      starEmptyColor="#ccc" // Optional: Change empty star color
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;

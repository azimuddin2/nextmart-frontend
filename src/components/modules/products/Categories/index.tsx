'use client';

import CategoryCard from '@/components/ui/core/CategoryCard';
import { ICategory } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '@/app/globals.css';

type TCategoriesProps = {
  categories: ICategory[];
};

const Categories = ({ categories }: TCategoriesProps) => {
  return (
    <div className="my-12">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Featured Collection</h2>
      </div>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#693AF8',
            '--swiper-navigation-size': '18px',
            '--swiper-navigation-top-offset': '6%',
          } as React.CSSProperties
        }
        className={` mySwiper`}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          576: { width: 576, slidesPerView: 2 },
          768: { width: 768, slidesPerView: 3 },
          1280: { width: 1280, slidesPerView: 6 },
        }}
        modules={[A11y, Navigation, Autoplay]}
        spaceBetween={0}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={true}
      >
        {categories.map((category) => (
          <SwiperSlide className="lg:px-2 pt-16" key={category._id}>
            <CategoryCard category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;

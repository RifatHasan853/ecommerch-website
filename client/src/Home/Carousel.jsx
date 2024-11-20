// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'


import bgimg1 from '../assets/colorful-sneaker-is-being-spray-painted-with-purple-spray-paint.jpg'
import bgimg2 from '../assets/2151039316.jpg'
import bgimg3 from '../assets/2150670745.jpg'
import bgimg4 from '../assets/black-shirt-with-word-ultra-it.jpg'

import Slide from '../components/Slide'

export default function Carousel() {
  return (
    <div className='container px-4  mx-auto  lg:block xl:block md:block xl:w-[36rem]  lg:w-[36rem] md:w-[40rem] sm:w-[40rem] sm:h-1/2 sm:block'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text='Step into style and comfort with our sneakers.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text='Timeless watches for style and precision.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text='Find your perfect look with our stylish glasses.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg4}
            text='Stylish and comfortable mens T-shirts for every day.'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

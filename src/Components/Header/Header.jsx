import { useRef, useState, useEffect } from 'react';

import Card from './../Card/Card'

import {movies as moviesData} from '../../moviesData'

// icons
import { SiMetacritic } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";
import { BsFillCcSquareFill } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { MdOutlineDateRange } from "react-icons/md";
import { PiMedalBold } from "react-icons/pi";
import { FaMicrophoneAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";

// Swiper 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Header() {
    const [slides, setSlides] = useState(moviesData.filter(movie => movie.isInSlider))

    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef(null)

    const [activeObj, setActiveObj] = useState(slides[0])

    // calculate website rates bg average
    const calcRates = rates => {
        let likedRates = rates.filter(rate => rate.liked).length
        let totalRate = Math.round(likedRates / rates.length * 100)

        return totalRate
    }

    useEffect(() => {
        // the object of current Active Index of slider movies 
        setActiveObj(slides[activeIndex])
    }, [activeIndex])

    return (
        <div className="h-full w-full -mt-12">
            <div className="relative w-full h-screen overflow-hidden bg-red-500">
                {/* <img src="/src/assets/YouTube Banner.jpg" alt="" className="w-full h-full" /> */}
                <img src={activeObj.src} alt="" className="w-full h-full object-cover object-center transition-all" />
                <div className="lg:bg-gradient-to-r bg-gradient-to-t z-20 from-black/95 from-40% to-gray-0 !absolute top-0 h-full w-full"></div>

                <div className="z-30 absolute bottom-0 w-full h-3/4  py-20">
                    <div className="container mx-auto w-full h-full flex flex-col lg:flex-row items-center justify-between gap-5">
                        <div className="relative w-full lg:w-4/6 h-full mx-auto flex flex-col items-center lg:items-start gap-3 px-2 lg:px-0">

                            <div className="flex items-center gap-2">
                                <div className="w-fit flex items-center gap-2 p-2 rounded-lg bg-black/30 glass-effect">
                                    <span className="font-shabnam font-semibold text-yellow-500">جدیدترین ها</span>
                                    <PiMedalBold className="fill-yellow-500 text-md md:text-xl" />
                                </div>

                                {activeObj.subtitle && (
                                    <div className="w-fit h-fit rounded-md p-2 bg-white/10 glass-effect">
                                        <BsFillCcSquareFill className="text-md md:text-xl fill-sky-500" />
                                    </div>
                                )}

                                {activeObj.dubed && (
                                    <div className="w-fit h-fit rounded-md p-2 bg-white/10 glass-effect">
                                        <FaMicrophoneAlt className="text-md md:text-xl fill-red-500" />
                                    </div>
                                )}

                            </div>

                            <div className="flex flex-col lg:flex-row items-center justify-start gap-1 md:gap-2 lg:gap-5">
                                <h1 className="font-bold text-white text-3xl md:text-4xl font-sans shadow-black drop-shadow-2xl text-center lg:text-justify lg:line-clamp-1">{activeObj.title}</h1>
                                <span className="inline-block p-1.5 md:p-2 border border-gray-300 text-gray-300 text-sm font-semibold">{activeObj.age}</span>
                            </div>

                            <ul className="flex items-center gap-1 -mt-2">
                                {activeObj.genre.map(genreItem => (
                                    <li className="group font-Shabnam text-sm lg:text-md text-gray-300"><span>{genreItem}</span>  <span className="group-last:hidden text-gray-300">.</span></li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-3 xs:gap-4 sm:gap-6 lg:gap-8 select-none">
                                <div className="flex items-center justify-center gap-0.5">
                                    <FaImdb className="text-3xl md:text-3xl lg:text-4xl fill-yellow-500" />
                                    <span className="font-bold"><span className="text-xl md:text-2xl text-yellow-500">{activeObj.rating[0].rate}</span><span className="text-white">/10</span></span>
                                </div>

                                <div className="flex items-center justify-center gap-0.5">
                                    <SiRottentomatoes className="text-3xl md:text-3xl lg:text-4xl fill-red-500" />
                                    <span className="font-bold"><span className="text-xl md:text-2xl text-white">{activeObj.rating[1].rate}</span><span className="text-red-500">%</span></span>
                                </div>

                                <div className="flex items-center justify-center gap-0.5">
                                    <SiMetacritic className="text-3xl md:text-3xl lg:text-4xl fill-blue-500" />
                                    <span className="font-bold"><span className="text-xl md:text-2xl text-white">{activeObj.rating[2].rate}</span><span className="text-blue-500">%</span></span>
                                </div>

                                <div className="hidden xs:flex items-center justify-center gap-0.5">
                                    <BiLike className="text-3xl md:text-3xl lg:text-4xl fill-green-500" />
                                    <span className="font-bold"><span className="text-xl md:text-2xl text-white">{calcRates(activeObj.rating[3].rates)}</span><span className="text-green-500">%</span> <span className="hidden md:inline text-sm text-gray-100 font-vazir">({activeObj.rating[3].rates.length} رای)</span> </span>
                                </div>

                            </div>

                            <p className="font-vazir text-center text-gray-200 lg:text-justify p-2">{activeObj.desc}</p>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center justify-center gap-2">
                                    <GoClock className="text-2xl  fill-gray-200" />
                                    <span className="text-gray-100 text-md font-semibold font-Shabnam">{activeObj.time}</span>
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <MdOutlineDateRange className="text-2xl  fill-gray-200" />
                                    <span className="text-gray-100 text-md font-semibold font-Shabnam">{activeObj.year}</span>
                                </div>

                            </div>
                        </div>

                        <div className="invisible w-0 h-0 lg:visible lg:w-2/6 lg:h-full">
                            <Swiper
                                ref={swiperRef}
                                onSlideChange={() => setActiveIndex(swiperRef.current?.swiper.realIndex)}
                                modules={[Autoplay]}
                                slidesPerView={2}
                                spaceBetween={10}
                                loop={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                className="mySwiper h-full !px-2 !pb-8"
                            >
                                {slides.map((slide, index) => (
                                    <SwiperSlide key={slide.id} className={`w-1/2 bg-white rounded-lg text-center h-full select-none ${activeIndex == index && 'border border-yellow-500'}`}> <Card isActive={activeIndex == index} {...slide} /> </SwiperSlide>
                                ))}
                                {/* <SwiperSlide className="w-1/2 bg-white h-full select-none">Slide 2</SwiperSlide>
                                <SwiperSlide className="w-1/2 bg-white h-full select-none">Slide 3</SwiperSlide>
                                <SwiperSlide className="w-1/2 bg-white h-full select-none">Slide 4</SwiperSlide>
                                <SwiperSlide className="w-1/2 bg-white h-full select-none">Slide 5</SwiperSlide>
                                <SwiperSlide className="w-1/2 bg-white h-full select-none">Slide 6</SwiperSlide>
                                <SwiperSlide className="w-1/2 bg-white h-full select-none">Slide 7</SwiperSlide>
                                <SwiperSlide className="w-1/2 bg-white h-full select-none">Slide 8</SwiperSlide>
                                <SwiperSlide className="w-1/2 bg-white h-full select-none">Slide 9</SwiperSlide> */}
                            </Swiper>
                        </div>
                    </div>

                </div>
            </div>
            {/* <div className="h-screen w-full bg-sky-500">

            </div> */}
            
        </div>
    )
}

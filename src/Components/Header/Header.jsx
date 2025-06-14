import { useRef, useState, useEffect, useContext } from 'react';

import Card from './../Card/Card'

// import {movies as moviesData} from './../../moviesData'
import UserContext from './../../Contexts/MoviesContext'

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
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef(null)

    let { movies: moviesArray } = useContext(UserContext)
    const [movies, setMovies] = useState(moviesArray.filter(movie => movie.is_in_header_slider && movie.broadcastStatus != 'premiere'))
    const [activeObj, setActiveObj] = useState(moviesArray.filter(movie => movie.is_in_header_slider && movie.broadcastStatus != 'premiere')[0])

    // calculate website rates bg average
    const calcRates = rates => {
        let likedRates = rates.filter(rate => rate.liked).length
        let totalRate = Math.round(likedRates / rates.length * 100)

        return totalRate
    }

    useEffect(() => {
        // the object of current Active Index of slider movies 
        setActiveObj(movies[activeIndex])
    }, [activeIndex])

    useEffect(() => {
        if (moviesArray.length > 0) {
            let sliderMovies = moviesArray.filter(movie => movie.is_in_header_slider && movie.broadcastStatus != 'premiere')
            setMovies(sliderMovies)
            setActiveObj(sliderMovies[0])

            // even in loop=true first slide will be active
            setTimeout(() => {
                swiperRef.current?.swiper?.slideToLoop(0, 0)
                // swiper can't reinitialize
                const swiperInstance = swiperRef.current?.swiper
                if (swiperInstance) {
                    // swiper can't reinitialize
                    swiperRef.current.swiper.slideTo(0)
                    swiperInstance.autoplay?.start()
                }
            }, 50)
        }
    }, [moviesArray])

    if(movies.length == 0){
        return null
    }

    return (
        <div className="h-full w-full -mt-12">
            <div className="relative w-full h-screen overflow-hidden bg-red-500">
                <img src={activeObj?.banner} alt="" className="w-full h-full object-cover object-center transition-all" />
                <div className="lg:bg-gradient-to-r bg-gradient-to-t z-20 from-black/95 from-40% to-gray-0 !absolute top-0 h-full w-full"></div>

                <div className="z-30 absolute bottom-0 w-full h-3/4  py-20">
                    <div className="container mx-auto w-full h-full flex flex-col lg:flex-row items-center justify-between gap-5">
                        <div className="relative w-full lg:w-4/6 h-full mx-auto flex flex-col items-center lg:items-start gap-3 px-2 lg:px-0">

                            <div className="flex items-center gap-2">
                                <div className="w-fit flex items-center gap-2 p-2 rounded-lg bg-black/30 glass-effect">
                                    <span className="font-shabnam font-semibold text-yellow-500">جدیدترین ها</span>
                                    <PiMedalBold className="fill-yellow-500 text-md md:text-xl" />
                                </div>

                                {activeObj?.has_subtitle && (
                                    <div className="w-fit h-fit rounded-md p-2 bg-white/10 glass-effect">
                                        <BsFillCcSquareFill className="text-md md:text-xl fill-sky-500" />
                                    </div>
                                )}

                                {activeObj?.is_dubbed && (
                                    <div className="w-fit h-fit rounded-md p-2 bg-white/10 glass-effect">
                                        <FaMicrophoneAlt className="text-md md:text-xl fill-red-500" />
                                    </div>
                                )}

                            </div>

                            <div className="flex flex-col lg:flex-row items-center justify-start gap-1 md:gap-2 lg:gap-5">
                                <a href={`/${activeObj?.movieType}/${activeObj?.id}`} className="inline-block font-bold text-white hover:text-yellow-500 transition-colors text-3xl md:text-4xl font-sans shadow-black drop-shadow-2xl text-center lg:text-justify lg:line-clamp-1">{activeObj?.title}</a>
                                <span className="inline-block p-1 border border-gray-300 text-gray-300 text-sm font-semibold">{activeObj?.age}</span>
                            </div>

                            <ul className="flex items-center gap-1 -mt-2">
                                {activeObj?.genres.map((genreItem , index) => (
                                    <li key={index} className="group font-Shabnam text-sm lg:text-md text-gray-300"><span>{genreItem}</span>  <span className="group-last:hidden text-gray-300">.</span></li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-3 xs:gap-4 sm:gap-6 lg:gap-8 select-none">
                                <div className="flex items-center justify-center gap-0.5">
                                    <FaImdb className="text-3xl md:text-3xl lg:text-4xl fill-yellow-500" />
                                    <span className="font-bold"><span className="text-xl md:text-2xl text-yellow-500">{activeObj?.imdb_score == -1 ? '-' : activeObj?.imdb_score}</span><span className="text-white">/10</span></span>
                                </div>

                                <div className="flex items-center justify-center gap-0.5">
                                    <SiRottentomatoes className="text-3xl md:text-3xl lg:text-4xl fill-red-500" />
                                    <span className="font-bold"><span className="text-xl md:text-2xl text-white">{activeObj?.rotten_score == -1 ? '-' : activeObj?.rotten_score}</span><span className="text-red-500">%</span></span>
                                </div>

                                <div className="flex items-center justify-center gap-0.5">
                                    <SiMetacritic className="text-3xl md:text-3xl lg:text-4xl fill-blue-500" />
                                    <span className="font-bold"><span className="text-xl md:text-2xl text-white">{activeObj?.metacritic_score == -1 ? '-' : activeObj?.metacritic_score}</span><span className="text-blue-500">%</span></span>
                                </div>
                            </div>

                            <p className="font-vazir text-center text-gray-200 lg:text-justify p-2">{activeObj?.description}</p>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center justify-center gap-2">
                                    <GoClock className="text-2xl  fill-gray-200" />
                                    <span className="text-gray-100 text-md font-semibold font-Shabnam">{activeObj?.duration} دقیقه</span>
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <MdOutlineDateRange className="text-2xl  fill-gray-200" />
                                    <span className="text-gray-100 text-md font-semibold font-Shabnam">{activeObj?.year}</span>
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
                                {movies.map((movie, index) => (
                                    <SwiperSlide key={movie.id} className={`w-1/2 bg-white rounded-lg text-center h-full select-none ${activeIndex == index && 'border border-yellow-500'}`}> <Card isActive={activeIndex == index} {...movie} /> </SwiperSlide>
                                ))}
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

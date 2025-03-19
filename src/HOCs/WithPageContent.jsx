import React, { useState } from 'react'

import NewMoviesTable from './../Components/NewMoviesTable/NewMoviesTable'
import GenreTables from './../Components/GenreTables/GenreTables'
import UpdatedSeries from './../Components/UpdatedSeries/UpdatedSeries'

import { movies as moviesData } from '../moviesData'

import { IoLogoInstagram } from "react-icons/io";
import { PiTelegramLogoDuotone } from "react-icons/pi";


export default function WithPageContent(Comp , movieContent) {
    const NewComponent = () => {
        const [movieTable, setMovieTable] = useState({
            'شنبه': [{ movieId: 18, newEpisode: { season: 2, episode: 9 } }, { movieId: 19, newEpisode: { season: 1, episode: 4 } }],
            'یکشنبه': [{ movieId: 11, newEpisode: { season: 1, episode: 5 } }, { movieId: 12, newEpisode: { season: 3, episode: 7 } }],
            'دوشنبه': [{ movieId: 1, newEpisode: null }, { movieId: 14, newEpisode: { season: 5, episode: 1 } }, { movieId: 13, newEpisode: { season: 2, episode: 3 } }],
            'سه شنبه': [{ movieId: 5, newEpisode: null }],
            'چهارشنبه': [],
            'پنجشنبه': [{ movieId: 4, newEpisode: null }],
            'جمعه': [{ movieId: 15, newEpisode: { season: 1, episode: 7 } }],
        })

        const [slides, setSlides] = useState(moviesData)

        const [genres, setGenres] = useState({
            'movie': ['اکشن', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'ماجراجویی', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی'],
            'series': ['اکشن', 'Talk-Show', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'ماجراجویی', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی', 'موسیقی']
        })

        return (
            <div className={`container mx-auto ${movieContent && '!px-5'} flex flex-col lg:flex-row gap-x-4 gap-y-7 mt-12`}>
                {/* right side */}
                <div className="w-full lg:w-2/3 flex flex-col gap-7">
                    <Comp movies={slides} movieTable={movieTable} />
                </div>

                {/* left side */}
                <div className="w-full lg:w-1/3 flex flex-col gap-y-7">
                    <div className="w-full flex flex-col items-center justify-center gap-3">
                        <a href="#" className="inline-block w-full">
                            <div className="bg-gradient-to-r z-20 from-(--purpleCustom) to-(--orangeCustom) w-full rounded-xl p-4 flex items-center justify-between">
                                <span className="font-vazir text-white font-semibold">اينستاگرام ما</span>
                                <IoLogoInstagram className="text-white text-4xl" />
                            </div>

                        </a>
                        <a href="#" className="inline-block w-full">
                            <div className="bg-gradient-to-r z-20 from-blue-600 to-sky-400 w-full p-4 rounded-xl flex items-center justify-between">
                                <span className="font-vazir text-white font-semibold">تلگرام ما</span>
                                <PiTelegramLogoDuotone className="text-white text-4xl" />
                            </div>
                        </a>
                    </div>
                    <NewMoviesTable movies={slides} />
                    <UpdatedSeries series={slides.filter(slide => slide.type == 'series')} />
                    <GenreTables genre={genres} movies={slides} />
                </div>
            </div>
        )
    }

    return NewComponent
}

import React from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import ActorMovieCard from '../../Components/ActorMovieCard/ActorMovieCard'
import {findArrayByIds} from './../../utils'
import { movies, casts } from '../../moviesData'


export default function Actors() {
    let { actorsId } = useParams()

    let navigate = useNavigate()

    let actorObj = casts.find(cast => cast.id == actorsId)

    !actorObj && navigate(-1)

    return (
        <div className="flex flex-col gap-5 min-h-screen">
            <div className="container mx-auto h-fit py-12 flex flex-col md:flex-row items-center justify-center md:justify-start gap-5 border-b border-gray-200 dark:border-secondary px-10 lg:px-0">
                <div className="flex items-center justify-center rounded-full overflow-hidden h-32 min-w-32">
                    <img src={actorObj.src} alt="" className="w-full h-full object-cover object-center" />
                </div>
                <div className="h-full flex flex-col items-center md:items-start justify-between gap-2">
                    <h2 className="text-gray-700 dark:text-white font-bold">{actorObj.name}</h2>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center justify-center gap-1 font-vazir">
                            <span className="text-light-gray dark:text-gray-500">تولد :</span>
                            <span className="text-light-gray dark:text-gray-500">نامشخص</span>
                        </div>

                        <div className="flex items-center justify-center gap-1 font-vazir">
                            <span className="text-light-gray dark:text-gray-500">سن :</span>
                            <span className="text-light-gray dark:text-gray-500">نامشخص</span>
                        </div>

                        <div className="flex items-center justify-center gap-1 font-vazir">
                            <span className="text-light-gray dark:text-gray-500">قد :</span>
                            <span className="text-light-gray dark:text-gray-500">نامشخص</span>
                        </div>
                    </div>
                    <p className="text-light-gray dark:text-gray-400 font-vazir-light text-center md:text-justify">ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد </p>
                </div>
            </div>
            <div className="container mx-auto py-5 space-y-9 px-5">
                <h2 className="text-center lg:text-justify text-gray-700 dark:text-white text-2xl font-vazir">مجموعه آثار</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                    {findArrayByIds(actorObj.movies, movies).map(movie => (
                        <ActorMovieCard {...movie} />
                    ))}
                </div>
            </div>

        </div>
    )
}

import React, { useState, useEffect , useContext } from 'react'

import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import LoadingContext from '../../Contexts/LoadingContext'

import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";

import { getMovies , deleteMovie } from '../../Services/Axios/Requests/Movies';

// accord this object we ca understand which property and which value should compare to eachother
const filterSearchObj = {
    'ID': { hasValue: false, property: 'id' },
    'title': { hasValue: false, property: 'title' },
    'year': { hasValue: false, property: 'year' },
    'movies': { hasValue: true, property: 'movieType', value: 'movie' },
    'series': { hasValue: true, property: 'movieType', value: 'series' },
    'released': { hasValue: true, property: 'broadcastStatus', value: 'released' },
    'premiere': { hasValue: true, property: 'broadcastStatus', value: 'premiere' },
    'canceled': { hasValue: true, property: 'broadcastStatus', value: 'canceled' },
    'broadcasting': { hasValue: true, property: 'broadcastStatus', value: 'broadcasting' },
    'suggested': { hasValue: true, property: 'is_suggested', value: true },
    'isInSlider': { hasValue: true, property: 'is_in_header_slider', value: true },
    'isInNewMovies': { hasValue: true, property: 'is_in_new_movies', value: true },
    'isDubbed': { hasValue: true, property: 'is_dubbed', value: true },
    'hasSubtitle': { hasValue: true, property: 'has_subtitle', value: true },
}

export default function AllMovies() {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [searchType, setSearchType] = useState('ID')
    const [searchValue, setSearchValue] = useState('')

    const [getMoviesFlag, setGetMoviesFlag] = useState(false)
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [movieObj, setMovieObj] = useState(null)

    const { loading, setLoading } = useContext(LoadingContext)

    const DeleteMovieHandler = async () => {
        try {
            const res = await deleteMovie(movieObj.id)

            console.log(res , res.status)
            setShowDeleteModal(false)
            setGetMoviesFlag(prev => !prev)

        } catch (err) {
            console.log('fetch error')
        }
    }

    useEffect(() => {
        const getAllMovies = async () => {
            try {
                const data = await getMovies()

                if (data.length > 0) {
                    let sortedMoviesArray = data.sort((a, b) => {
                        let aDate = new Date(a.created_at).getTime()
                        let bDate = new Date(b.created_at).getTime()
                        return bDate - aDate
                    })
                    setMovies(sortedMoviesArray)
                    setFilteredMovies(sortedMoviesArray)
                    // console.log(sortedMoviesArray)
                    setIsPending(false)
                    setError(false)
                }

            } catch (err) {
                console.log('fetch error', err)
                isPending(false)
                setError(err)
            }
        }

        setIsPending(true)
        getAllMovies()
    }, [getMoviesFlag])

    useEffect(() => {
        let filterObj = filterSearchObj[searchType]
        let filteredUsersArray = []

        // when we search something or we change the searchType we should filter the users Array again  
        if (filterObj) {
            // for searchTypes that they have value (their value is not boolean and might be a variable)
            if (filterObj.hasValue) {
                filteredUsersArray = movies.filter(user => user[filterObj.property] == filterObj.value)
            } else {
                if (searchValue) {
                    if (filterObj.property == 'id' || filterObj.property == 'year') {
                        filteredUsersArray = movies.filter(user => user[filterObj.property] == searchValue)
                    } else if (typeof filterObj.property == 'string') {
                        console.log('name')
                        filteredUsersArray = movies.filter(user => user[filterObj.property].toLowerCase().startsWith(searchValue))
                    }
                } else {
                    filteredUsersArray = [...movies]
                }
            }
        }

        setFilteredMovies(filteredUsersArray)
    }, [searchValue, searchType])

    useEffect(() => {
        if(movies.length > 0 && loading){
            setLoading(false)
        }
    } , [movies])

    return (
        <>
            <div className="w-full panel-box py-4 px-5 flex flex-col gap-7 mb-12">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">فیلم ها</h2>
                    <a href="/my-account/adminPanel/movies/add-movie" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600 transition-colors">افزودن فیلم جدید</a>
                </div>
                <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">

                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                        <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                            <select
                                name=""
                                id=""
                                className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                value={searchType}
                                onChange={e => setSearchType(e.target.value)}
                            >
                                <option value="ID">ID</option>
                                <option value="title">نام فیلم</option>
                                <option value="year">سال انتشار</option>
                                <option value="movies">فیلم ها</option>
                                <option value="series">سریال ها</option>
                                <option value="released">منتشر شده ها</option>
                                <option value="premiere">پیش نمایش</option>
                                <option value="canceled">کنسل شده</option>
                                <option value="broadcasting">در حال نمایش</option>
                                <option value="suggested">پیشنهادی ها</option>
                                <option value="isInSlider">در هدر نمایش داده می شود</option>
                                <option value="isInNewMovies">در فیلم های جدید قرار دارند</option>
                                <option value="isDubbed">دوبله شده</option>
                                <option value="hasSubtitle">زيرنويس</option>
                            </select>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
                        </div>

                        {
                            (searchType != 'movies' && searchType != 'series' && searchType != 'released' && searchType != 'premiere' && searchType != 'canceled' && searchType != 'broadcasting' && searchType != 'suggested' && searchType != 'isInSlider' && searchType != 'isInNewMovies' && searchType != 'isDubbed' && searchType != 'hasSubtitle') && (
                                <div className="w-full relative select-none">
                                    <input
                                        type="text"
                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={searchValue}
                                        onChange={e => setSearchValue(e.target.value)}
                                    />
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو</span>
                                </div>
                            )
                        }
                    </div>

                    <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
                        <table className="w-full">
                            <thead className="min-w-full">
                                <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">سال انتشار</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نوع فیلم</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت پخش</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">پیشنهادی</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isPending && !error &&
                                    filteredMovies.length > 0 && (
                                        filteredMovies.map(movie => (
                                            <tr key={movie.id} className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{movie.id}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{movie.title}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{movie.year}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{movie.movieType == 'movie' ? 'فیلم' : 'سریال'}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{movie.broadcastStatus == 'released' ? 'منتشر شده' : movie.broadcastStatus == 'premiere' ? 'پیش نمایش' : movie.broadcastStatus == 'broadcasting' ? 'در حال پخش' : 'کنسل شده'}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{movie.is_suggested ? 'بله' : 'خیر'}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                                    <a
                                                        href={`/my-account/adminPanel/movies/edit-movie/${movie.id}`}
                                                        className="p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group"
                                                    >
                                                        <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                                                    </a>

                                                    <a
                                                        href={`/my-account/adminPanel/movies/movie-details/${movie.id}`}
                                                        className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group"
                                                    >
                                                        <FaEye className="text-green-500 group-hover:text-white transition-all" />
                                                    </a>

                                                    <button
                                                        className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group"
                                                        onClick={e => {
                                                            setMovieObj(movie)
                                                            setShowDeleteModal(true)
                                                        }}
                                                    >
                                                        <LuTrash2 className="text-red-500 group-hover:text-white transition-all" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>

                        {!isPending && filteredMovies.length == 0 && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">فيلمي با همچین مشخصاتی پیدا نشد</h2>
                        )}

                        {isPending && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
                        )}

                        {error && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                        )}

                    </div>
                </div>
            </div>

            <DeleteModal deleteHandler={DeleteMovieHandler} showModal={showDeleteModal} setShowModal={setShowDeleteModal} name={movieObj?.title} tableName="فیلم" />
        </>
    )
}

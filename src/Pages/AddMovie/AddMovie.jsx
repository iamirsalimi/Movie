import React, { useState, useEffect } from 'react'

import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import jalali from 'jalaliday';
import 'react-datepicker/dist/react-datepicker.css';

import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowRight } from "react-icons/md";

dayjs.extend(jalali)

const genres = {
    'movie': ['اکشن', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'ماجراجویی', 'انیمه', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی'],
    'series': ['اکشن', 'Talk-Show', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'انیمه', 'ماجراجویی', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی', 'موسیقی']
}

const days = ['sunday', 'monday', 'tuesday', 'wednsday', 'thursday', 'friday', 'saturday']

let apiData = {
    getActorsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Casts?select=*',
    updateApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?id=eq.',
    postApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies',
    getAllApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?select=*',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

// uses for year max limit
let yearLimit = new Date().getFullYear()

export default function AddMovie() {
    const [movieObj, setMovieObj] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isAdding, setIsAdding] = useState(false)

    // inputs
    const [subtitleCheckbox, setSubtitleCheckbox] = useState(false)
    const [dubbedCheckbox, setDubbedCheckbox] = useState(false)
    const [isInHeaderSliderCheckbox, setIsInHeaderSliderCheckbox] = useState(false)
    const [isInNewMoviesCheckbox, setIsInNewMoviesCheckbox] = useState(false)
    const [suggestedCheckbox, setSuggestedCheckbox] = useState(false)

    const [languageValue, setLanguageValue] = useState()
    const [languages, setLanguages] = useState([])

    const [countryValue, setCountryValue] = useState()
    const [countries, setCountries] = useState([])

    const [linkTitle, setLinkTitle] = useState()
    const [linkType, setLinkType] = useState('dubbed')
    const [links, setLinks] = useState([])

    const [tagTitle, setTagTitle] = useState('')
    const [tags, setTags] = useState([])

    const [genre, setGenre] = useState('')
    const [showGenres, setShowGenres] = useState(false)
    const [movieGenres, setMovieGenres] = useState([])

    const [similarMovieId, setSimilarMovieId] = useState('')
    const [showSimilarMovies, setShowSimilarMovies] = useState(false)
    const [similarMovies, setSimilarMovies] = useState([])
    const [moviesArray, setMoviesArray] = useState([])
    const [movieIsPending, setMovieIsPending] = useState(false)
    const [movieError, setMovieError] = useState(false)

    const [castId, setCastId] = useState()
    const [castName, setCastName] = useState('')
    const [castRole, setCastRole] = useState('actor')
    const [showCasts, setShowCasts] = useState(false)
    const [movieCasts, setMovieCasts] = useState([])
    const [castsArray, setCastsArray] = useState([])
    const [castIsPending, setCastIsPending] = useState(false)
    const [castError, setCastError] = useState(false)

    const [notifTitle, setNotifTitle] = useState('')
    const [notifs, setNotifs] = useState([])

    // const [releaseDate, setReleaseDate] = useState(new Date())

    // const formattedJalaliDate = dayjs(releaseDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')

    const { movieId } = useParams()

    // inputs validation
    const schema = yup.object().shape({
        title: yup.string().required('وارد كردن نام فیلم اجباري است'),
        mainTitle: yup.string().required('وارد كردن نام اصلی فیلم اجباري است'),
        cover: yup.string().required('وارد كردن cover اجباري است'),
        banner: yup.string(),
        movieType: yup
            .string().oneOf(['movie', 'series']),
        broadcastStatus: yup.string()
            .required('Broadcast type is required.')
            .when('movieType', {
                is: 'movie',
                then: (schema) =>
                    schema.oneOf(['premiere', 'released']),
                otherwise: (schema) =>
                    schema.oneOf(['premiere', 'released', 'canceled', 'broadcasting']),
            }),
        genres: yup
            .array()
            .required('مقدار ژانر نمی تواند خالی باشد')
            .min(2, 'باید حداقل شامل 2 ژانر باشد'),
        countries: yup
            .array()
            .required('مقدار کشور نمی تواند خالی باشد')
            .min(1, 'باید حداقل شامل 1 کشور باشد'),
        languages: yup
            .array()
            .required('مقدار زبان نمی تواند خالی باشد')
            .min(1, 'باید حداقل شامل 1 زبان باشد'),
        similarMovies: yup
            .array()
            .notRequired(),
        links: yup
            .array()
            .notRequired(),
        tags: yup
            .array()
            .notRequired(),
        notifications: yup
            .array()
            .notRequired(),
        casts: yup
            .array()
            .notRequired(),
        age: yup
            .string()
            .required('وارد کردن رده سنی اجباری است')
            .oneOf(["G", "PG", "PG-13", "R", "NC-17"]),
        year: yup
            .number()
            .min(1900, 'سال حداقل می تواند 1900 باشد')
            .max(yearLimit, `سال حداکثر می تواند  ${yearLimit} باشد`)
            .required('وارد كردن سال پخش اجباری است'),
        company: yup
            .string(),
        imdb_score: yup
            .number()
            .min(0, 'نمره IMDb نمی تواند از 0 کمتر باشد')
            .max(10, 'نمره IMDb نمی تواند از 10 بیشتر باشد'),
        rotten_score: yup
            .number()
            .min(0, 'نمره Rotten-Tomatoes نمی تواند از 0 کمتر باشد')
            .max(100, 'نمره Rotten-Tomatoes نمی تواند از 10 بیشتر باشد'),
        metacritic_score: yup
            .number()
            .min(0, 'نمره Metacritic نمی تواند از 0 کمتر باشد')
            .max(100, 'نمره Metacritic نمی تواند از 10 بیشتر باشد'),
        quality: yup
            .string()
            .required('وارد كردن کیفیت اجباری است'),
        duration: yup
            .number()
            .min(1, 'مدت زمان حداقل می تواند 1 دقیقه باشد')
            .required('وارد كردن مدت زمان اجباری است'),
        description: yup
            .string()
            .required('وارد كردن توضیحات اجباری است'),
        totalSeasons: yup
            .number()
            .min(1, 'تعداد فصل ها حداقل میتواند 1 باشد')
            .when('movieType', {
                is: 'movie',
                then: schema => schema.notRequired(),
                otherwise: schema => schema.erquired('وارد کردن تعداد فصل ها اجباری است')
            }),
    })

    let {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            movieType: 'movie',
            age: 'G',
            broadcastStatus: 'premiere',
            totalSeasons: 1,
            genres: [],
            banner: null
        },
        resolver: yupResolver(schema)
    })

    const movieType = watch('movieType')

    // update movie
    const updateMovieHandler = async newMovieObj => {
        await fetch(`${apiData.updateApi}${movieObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newMovieObj)
        }).then(res => {
            if (res.ok) {
                console.log(res)
                location.href = "/my-account/adminPanel/movies/add-movie"
            }
        })
            .catch(err => {
                setIsAdding(false)
                console.log('مشکلی در آپدیت هنرپیشه پیش آمده')
            })
    }

    const updateMovie = async data => {
        let newMovieObj = { ...data }

        // if (data.title != movieObj.title || data.mainTitle != movieObj.mainTitle || data.cover != movieObj.cover || data.banner != movieObj.banner || data.imdb_score != movieObj.imdb_score || data.rotten_score != movieObj.rotten_score || data.metacritic_score != movieObj.metacritic_score || data.movieType != movieObj.movieType || data.broadcastStatus != movieObj.broadcastStatus || data.age != movieObj.age || data.company != movieObj.company || data.quality != movieObj.quality || data.duration != movieObj.duration || data.description != movieObj.description || subtitleCheckbox != movieObj.has_subtitle || dubbedCheckbox != movieObj.is_dubbed || isInHeaderSliderCheckbox != movieObj.is_in_header_slider || isInNewMoviesCheckbox != movieObj.is_in_new_movies || suggestedCheckbox != movieObj.is_suggested || data.year != movieObj.year || data.totalSeasons != movieObj.totalSeasons) {
        setIsAdding(true)
        newMovieObj.created_at = movieObj.created_at
        newMovieObj.updated_at = new Date()
        newMovieObj.has_subtitle = subtitleCheckbox
        newMovieObj.is_dubbed = dubbedCheckbox
        newMovieObj.is_in_header_slider = isInHeaderSliderCheckbox
        newMovieObj.is_in_new_movies = isInNewMoviesCheckbox
        newMovieObj.is_suggested = suggestedCheckbox
        newMovieObj.site_scores = movieObj.site_scores
        newMovieObj.totalSeasons = movieType == 'series' ? newMovieObj.totalSeasons : null

        // for (let key in newMovieObj) {
        //     console.log(`${key} - ${typeof newMovieObj[key]} - ${newMovieObj[key]}`)
        // }

        // console.log(newMovieObj, Object.keys(newMovieObj).join(' '))
        await updateMovieHandler(newMovieObj)
        // }

    }

    // add new movie
    const addMovieHandler = async movieObj => {
        await fetch(apiData.postApi, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(movieObj)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                location.href = "/my-account/adminPanel/movies/add-movie"
            }
        })
            .catch(err => {
                setIsAdding(false)
                console.log('مشکلی در افزودن فیلم پیش آمده')
            })
    }

    const addMovie = async data => {
        // setIsAdding(true)
        let newMovieObj = { ...data }

        newMovieObj.created_at = new Date()
        newMovieObj.updated_at = new Date()
        newMovieObj.has_subtitle = subtitleCheckbox
        newMovieObj.is_dubbed = dubbedCheckbox
        newMovieObj.is_in_header_slider = isInHeaderSliderCheckbox
        newMovieObj.is_in_new_movies = isInNewMoviesCheckbox
        newMovieObj.is_suggested = suggestedCheckbox
        newMovieObj.site_scores = []
        newMovieObj.totalSeasons = movieType == 'series' ? newMovieObj.totalSeasons : null

        for (let key in newMovieObj) {
            console.log(`${key} - ${typeof newMovieObj[key]} - ${newMovieObj[key]}`)
        }

        console.log(newMovieObj, Object.keys(newMovieObj).join(' '))
        await addMovieHandler(newMovieObj)
    }

    // add Country
    const addCountry = e => {
        e.preventDefault()
        if (countryValue) {
            let newCountries = new Set(countries)
            newCountries.add(countryValue)
            setCountries([...newCountries])
            setCountryValue('')
        }
    }

    const deleteCountry = (e, value) => {
        e.preventDefault()
        let newCountries = new Set(countries)
        newCountries.delete(value)
        setCountries([...newCountries])
    }

    // add Language
    const addLanguage = e => {
        e.preventDefault()
        if (languageValue) {
            let newLanguages = new Set(languages)
            newLanguages.add(languageValue)
            setLanguages([...newLanguages])
            setLanguageValue('')
        }
    }

    const deleteLanguage = (e, value) => {
        e.preventDefault()
        let newLanguages = new Set(languages)
        newLanguages.delete(value)
        setLanguages([...newLanguages])
    }

    // add Link
    const addLink = e => {
        e.preventDefault()
        if (linkTitle && linkType) {
            let newLinkObj = { id: Math.floor(Math.random() * 999), title: linkTitle, type: linkType, links: [] }
            setLinks(prev => [...prev, newLinkObj])
            setLinkTitle('')
        }
    }

    const deleteLink = (e, id) => {
        e.preventDefault()
        let newLinks = links.filter(link => link.id !== id)
        setLinks(newLinks)
    }

    // add Tag
    const addTag = e => {
        e.preventDefault()
        if (tagTitle) {
            let newTags = new Set(tags)
            newTags.add(tagTitle)
            setTags([...newTags])
            setTagTitle('')
        }
    }

    const deleteTag = (e, tagTitle) => {
        e.preventDefault()
        let newTags = new Set(tags)
        newTags.delete(tagTitle)
        setTags([...newTags])
    }

    // add Notif
    const addNotif = e => {
        e.preventDefault()
        if (notifTitle) {
            let newNotifs = new Set(notifs)
            newNotifs.add(notifTitle)
            setNotifs([...newNotifs])
            setNotifTitle('')
        }
    }

    const deleteNotif = (e, notifTitle) => {
        e.preventDefault()
        let newNotifs = new Set(notifs)
        newNotifs.delete(notifTitle)
        setNotifs([...newNotifs])
    }

    // add similar Movies
    const addSimilarMovie = e => {
        e.preventDefault()
        if (similarMovieId) {
            let isMovieAlreadyExist = similarMovies.some(movie => movie.movieId == similarMovieId)

            if(isMovieAlreadyExist){
                toast.error('این فیلم از قبل اضافه شده است')
                setSimilarMovieId('')
                return false;
            }
            
            let movieObj = moviesArray.find(movie => movie.id == similarMovieId)
            let newSimilarMovieObj = { id: Math.floor(Math.random() * 99999), movieId: similarMovieId, title: movieObj.title, cover: movieObj.cover }
            setSimilarMovies(prev => [...prev, newSimilarMovieObj])
            setSimilarMovieId('')
        }
    }

    const deleteSimilarMovie = (e, movieId) => {
        e.preventDefault()
        let newSimilarMovies = similarMovies.filter(movie => movie.id !== movieId)
        setSimilarMovies(newSimilarMovies)
    }

    // add genres
    const addGenre = genre => {
        let newGenres = new Set(movieGenres)
        newGenres.add(genre)
        setMovieGenres([...newGenres])
        setGenre('')
    }

    const deleteGenre = (e, genre) => {
        e.preventDefault()
        let newGenres = new Set(movieGenres)
        newGenres.delete(genre)
        setMovieGenres([...newGenres])
    }

    // add cast
    const addCast = e => {
        e.preventDefault()
        if (castId && castName && castRole) {
            let sameActorsArray = movieCasts.filter(cast => cast.castId == castId)
            // means cast already exist with that role
            let isUserAlreadyExist = sameActorsArray.length != 0 ? sameActorsArray.length > 1 ? sameActorsArray.some(cast => cast.role == castRole) : (sameActorsArray[0].role == castRole) : null

            if (isUserAlreadyExist) {
                toast.error('این هنرپیشه با این نقش از قبل اضافه شده است')
                setCastName('')
                setCastRole('actor')
                setCastId('')
                return false;
            }

            let actorObj = castsArray.find(cast => cast.id == castId)
            let newCast = { id: Math.floor(Math.random() * 99999), castId: castId, fullName: castName, role: castRole, src: actorObj.src }

            setMovieCasts(prev => [...prev, newCast])
            setValue('casts', [...movieCasts, newCast])
            setCastName('')
            setCastRole('actor')
            setCastId('')
        }
    }

    const deleteCast = (e, castId) => {
        e.preventDefault()
        let newCasts = movieCasts.filter(cast => cast.id !== castId)
        setMovieCasts(newCasts)
    }

    // to suggest genres
    useEffect(() => {
        setShowGenres(genre.trim().length != 0 ? true : false)
    }, [genre])

    // to suggest casts
    useEffect(() => {
        setShowCasts(castName.trim().length != 0 ? true : false)
    }, [castName])

    // to suggest similar movies

    // updating yup values when states updated
    useEffect(() => {
        setValue('genres', movieGenres)
    }, [movieGenres])

    useEffect(() => {
        setValue('similarMovies', similarMovies)
    }, [similarMovies])

    useEffect(() => {
        setValue('countries', countries)
    }, [countries])

    useEffect(() => {
        setValue('languages', languages)
    }, [languages])

    useEffect(() => {
        setValue('links', links)
    }, [links])

    useEffect(() => {
        setValue('tags', tags)
    }, [tags])

    useEffect(() => {
        setValue('notifications', notifs)
    }, [notifs])

    useEffect(() => {
        setValue('casts', movieCasts)
    }, [movieCasts])

    // getting casts array when user typing cast Name
    useEffect(() => {
        if (castsArray.length == 0 && castName) {
            const getAllActors = async () => {
                try {
                    const res = await fetch(apiData.getActorsApi, {
                        headers: {
                            'apikey': apiData.apikey,
                            'Authorization': apiData.authorization
                        }
                    })

                    const data = await res.json()

                    if (data) {
                        setCastsArray(data)
                        setCastIsPending(false)
                    }

                    setError(false)
                } catch (err) {
                    console.log('fetch error')
                    setCastError(err)
                    setCastIsPending(false)
                    setCastsArray([])
                }
            }

            setCastIsPending(true)
            getAllActors()
        }
    }, [castName])

    // getting movies array when user typing movie Id
    useEffect(() => {
        if (!similarMovieId) {
            setShowSimilarMovies(false)
        }

        if (moviesArray.length == 0 && similarMovieId) {
            const getAllMovies = async () => {
                try {
                    const res = await fetch(apiData.getAllApi, {
                        headers: {
                            'apikey': apiData.apikey,
                            'Authorization': apiData.authorization
                        }
                    })

                    const data = await res.json()

                    if (data) {
                        // means we are in update a movie so we shouldn't have our movie in movies array
                        let filteredMovies = [...data];
                        if (movieId) {
                            filteredMovies = data.filter(movie => movie.id != movieId)
                        }
                        setMoviesArray(filteredMovies)
                        setMovieIsPending(false)
                    }

                    setError(false)
                } catch (err) {
                    console.log('fetch error')
                    setCastError(err)
                    setMovieIsPending(false)
                    setMoviesArray([])
                }
            }

            setMovieIsPending(true)
            getAllMovies()
        }
    }, [similarMovieId])

    // for editing movie
    useEffect(() => {
        const getMovieInfo = async (movieId) => {
            try {
                const res = await fetch(`${apiData.getApi}${movieId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    setMovieObj(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/my-account/adminPanel/movies'
                }

                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setMovieObj(null)
            }
        }
        if (movieId) {
            setIsPending(true)
            getMovieInfo(movieId)
        }
    }, [])

    // filling inputs with movie we want to edit details
    useEffect(() => {
        if (movieObj) {
            setValue('title', movieObj.title)
            setValue('mainTitle', movieObj.mainTitle)
            setValue('cover', movieObj.cover)
            setValue('banner', movieObj.banner)
            setValue('movieType', movieObj.movieType)
            setValue('broadcastStatus', movieObj.broadcastStatus)
            setValue('age', movieObj.age)
            setValue('genres', movieObj.genres)
            setMovieGenres(movieObj.genres)
            setValue('company', movieObj.company)
            setValue('imdb_score', movieObj.imdb_score)
            setValue('rotten_score', movieObj.rotten_score)
            setValue('metacritic_score', movieObj.metacritic_score)
            setValue('countries', movieObj.countries)
            setCountries(movieObj.countries)
            setValue('languages', movieObj.languages)
            setLanguages(movieObj.languages)
            setValue('quality', movieObj.quality)
            setValue('duration', movieObj.duration)
            setValue('description', movieObj.description)
            setSubtitleCheckbox(movieObj.has_subtitle)
            setDubbedCheckbox(movieObj.is_dubbed)
            setIsInHeaderSliderCheckbox(movieObj.is_in_header_slider)
            setIsInNewMoviesCheckbox(movieObj.is_in_new_movies)
            setSuggestedCheckbox(movieObj.is_suggested)
            setValue('similarMovies', movieObj.similarMovies)
            setSimilarMovies(movieObj.similarMovies)
            setValue('links', movieObj.links)
            setLinks(movieObj.links)
            setValue('tags', movieObj.tags)
            setTags(movieObj.tags)
            setValue('casts', movieObj.casts)
            setMovieCasts(movieObj.casts)
            setValue('notifications', movieObj.notifications)
            setNotifs(movieObj.notifications)
            setValue('totalSeasons', movieObj.totalSeasons)
            setValue('year', movieObj.year)
        }
    }, [movieObj])

    return (
        <div className="w-full panel-box py-4 px-5 flex flex-col gap-7 overflow-hidden mb-20 md:mb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="w-full font-vazir text-gray-800 dark:text-white text-xl">{movieId ? 'آپدیت فیلم' : 'افزودن فیلم جدید'}</h2>
                    {movieId && (
                        <span className="text-sm text-gray-300 dark:text-gray-500 hidden md:inline">#{movieId}</span>
                    )}
                </div>

                <a href="/my-account/adminPanel/movies" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست فیلم ها</span>
                </a>
            </div>

            {isPending && (
                <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت اطلاعات ... </h2>
            )}

            {error && (
                <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
            )}

            {!isPending && (
                <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={!movieObj ? handleSubmit(addMovie) : handleSubmit(updateMovie)}>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('title')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام فیلم</span>
                        {errors?.title && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.title?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('mainTitle')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان اصلی فیلم</span>
                        {errors?.mainTitle && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.mainTitle?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('cover')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">cover</span>
                        {errors?.cover && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.cover?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('banner')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">banner</span>
                        {errors?.banner && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.banner?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative flex items-center justify-center gap-1">
                        <select
                            name=""
                            id=""
                            className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('movieType')}
                        >
                            <option value="movie">فیلم</option>
                            <option value="series">سریال</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نوع فیلم</span>
                        {errors?.movieType && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.movieType?.message}</span>
                        )}
                    </div>


                    <div className="w-full relative flex items-center justify-center gap-1">
                        <select
                            name=""
                            id=""
                            className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('broadcastStatus')}
                        >
                            <option value="released">منتشر شده</option>
                            <option value="premiere">پیش نمایش</option>
                            {movieType == 'series' && (
                                <>
                                    <option value="broadcasting">در حال پخش</option>
                                    <option value="canceled">کنسل شده</option>
                                </>
                            )}
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">وضعیت انتشار</span>
                        {errors?.broadcastStatus && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.broadcastStatus?.message}</span>
                        )}
                    </div>

                    {movieType == 'series' && (
                        <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                            <input
                                type="number"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('totalSeasons')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">تعداد فصل ها</span>
                            {errors?.totalSeasons && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.totalSeasons?.message}</span>
                            )}
                        </div>
                    )}

                    <div className="w-full relative flex items-center justify-center gap-1">
                        <select
                            name=""
                            id=""
                            className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('age')}
                        >
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                            <option value="NC-17">NC-17</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">رده سنی</span>
                        {errors?.age && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.age?.message}</span>
                        )}
                    </div>

                    <div className='w-full relative select-none'>
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('year')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">سال {movieType == 'series' ? 'های' : ''} پخش</span>
                        {errors?.year && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.year?.message}</span>
                        )}
                    </div>

                    {/* genre */}
                    <div className="md:col-start-1 md:col-end-3 w-full relative select-none flex flex-col items-center gap-2">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ژانر</span>

                        <ul className={`absolute top-15 z-30 ${showGenres ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'} transition-all w-full rounded-md grid grid-cols-4 gap-x-2 gap-y-4 py-4 px-5 bg-gray-200  dark:bg-primary`}>
                            {genres[movieType].filter(movieGenre => movieGenre.toLowerCase().startsWith(genre.toLowerCase())).length !== 0 ? genres[movieType].filter(movieGenre => movieGenre.toLowerCase().startsWith(genre.toLowerCase())).map(genre => (
                                <li
                                    className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center"
                                    onClick={e => addGenre(genre)}
                                >
                                    <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{genre}</span>
                                </li>
                            )) :
                                <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">ژانر "{genre}" وجود ندارد</div>
                            }
                        </ul>

                        {errors?.genres && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.genres?.message}</span>
                        )}

                        {movieGenres.length !== 0 && (
                            <div className="w-full bg-gray-100 dark:bg-primary rounded-lg py-2 px-4 flex items-center gap-2">
                                {movieGenres.map(genre => (
                                    <li
                                        className="rounded-md border border-white dark:border-secondary transition-all py-2 px-1 text-center inline-flex items-center justify-center gap-4"
                                    >
                                        <span className="text-sm font-vazir text-light-gray dark:text-white">{genre}</span>
                                        <button
                                            className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                            onClick={e => deleteGenre(e, genre)}
                                        >
                                            <RxCross2 className="text-white !cursor-pointer" />
                                        </button>
                                    </li>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('company')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">شبکه</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            step={0.1}
                            {...register('imdb_score')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">IMDb</span>
                        {errors?.imdb_score && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.imdb_score?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('rotten_score')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Rotten Tomatoes</span>
                        {errors?.rotten_score && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.rotten_score?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('metacritic_score')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Metacritic</span>
                        {errors?.metacritic_score && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.metacritic_score?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('quality')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">کیفیت</span>
                        {errors?.quality && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.quality?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('duration')}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">مدت زمان (دقیقه)</span>
                        {errors?.duration && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.duration?.message}</span>
                        )}
                    </div>

                    <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                        <textarea
                            className="w-full rounded-md p-3 min-h-28 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('description')}
                        ></textarea>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">توضیحات</span>
                        {errors?.description && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.description?.message}</span>
                        )}
                    </div>

                    {/* checkboxes */}
                    <div className="md:col-start-1 md:col-end-3 w-full relative grid grid-cols-2 gap-y-5">
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="subtitle-checkbox" type="checkbox" value="" className="peer" hidden checked={subtitleCheckbox} onChange={e => setSubtitleCheckbox(e.target.checked)} />
                            <label htmlFor="subtitle-checkbox" className="flex items-center gap-2 select-none">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">زیرنویس</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${subtitleCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="dubbed-checkbox" type="checkbox" value="" className="peer" hidden checked={dubbedCheckbox} onChange={e => setDubbedCheckbox(e.target.checked)} />
                            <label htmlFor="dubbed-checkbox" className="flex items-center gap-2 select-none">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">دوبله</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${dubbedCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="isInHeaderSlider-checkbox" type="checkbox" value="" className="peer" hidden checked={isInHeaderSliderCheckbox} onChange={e => setIsInHeaderSliderCheckbox(e.target.checked)} />
                            <label htmlFor="isInHeaderSlider-checkbox" className="flex items-center gap-2 select-none">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">درون اسلایدر هدر باشد؟</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${isInHeaderSliderCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="isInNewMovies-checkbox" type="checkbox" value="" className="peer" hidden checked={isInNewMoviesCheckbox} onChange={e => setIsInNewMoviesCheckbox(e.target.checked)} />
                            <label htmlFor="isInNewMovies-checkbox" className="flex items-center gap-2 select-none">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">درون جدیدترین فیلم ها باشد؟</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${isInNewMoviesCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="suggested-checkbox" type="checkbox" value="" className="peer" hidden checked={suggestedCheckbox} onChange={e => setSuggestedCheckbox(e.target.checked)} />
                            <label htmlFor="suggested-checkbox" className="flex items-center gap-2 select-none">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">پیشنهادی</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${suggestedCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                    </div>

                    {/* countries */}
                    <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                        <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">کشور ها</h3>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="w-full py-5 px-4 border border-gray-200 dark:border-secondary rounded-md grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                    <input
                                        type="text"
                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={countryValue}
                                        onChange={e => setCountryValue(e.target.value)}
                                    />
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">محصول</span>
                                </div>

                                <button
                                    className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                    onClick={addCountry}
                                >افزودن</button>
                            </div>

                            {errors?.countries && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.countries?.message}</span>
                            )}

                            {countries.length !== 0 && (
                                <div className="w-full flex flex-col items-center gap-2">
                                    <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">کشور ها</h3>
                                    <div className="w-full flex flex-col items-center gap-2">
                                        {countries.map(country => (
                                            <div className="w-full bg-gray-200 dark:bg-secondary flex items-center justify-between px-2 py-1 rounded-lg">
                                                <h3 className="text-light-gray dark:text-white font-shabnam">{country}</h3>
                                                <button
                                                    className="p-1 bg-red-500 hover:bg-blackred-600 transition-colors rounded-sm cursor-pointer"
                                                    onClick={e => deleteCountry(e, country)}
                                                >
                                                    <RxCross2 className="text-white dark:text-primary" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* languages */}
                    <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                        <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">زبان ها</h3>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="w-full py-5 px-4 border border-gray-200 dark:border-secondary rounded-md grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                    <input
                                        type="text"
                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={languageValue}
                                        onChange={e => setLanguageValue(e.target.value)}
                                    />
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">زبان</span>
                                </div>

                                <button
                                    className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                    onClick={addLanguage}
                                >افزودن</button>
                            </div>
                            {errors?.languages && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.languages?.message}</span>
                            )}

                            {languages.length !== 0 && (
                                <div className="w-full flex flex-col items-center gap-2">
                                    <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">زبان ها</h3>
                                    <div className="w-full flex flex-col items-center gap-2">
                                        {languages.map(language => (
                                            <div className="w-full bg-gray-200 dark:bg-secondary flex items-center justify-between px-2 py-1 rounded-lg">
                                                <h3 className="text-light-gray dark:text-white font-shabnam">{language}</h3>
                                                <button
                                                    className="p-1 bg-red-500 hover:bg-blackred-600 transition-colors rounded-sm cursor-pointer"
                                                    onClick={e => deleteLanguage(e, language)}
                                                >
                                                    <RxCross2 className="text-white dark:text-primary" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* links */}
                    <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                        <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">ساخت لینک جدید</h3>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="w-full py-5 px-4 border border-gray-200 dark:border-secondary rounded-md grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="w-full relative select-none">
                                    <input
                                        type="text"
                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={linkTitle}
                                        onChange={e => setLinkTitle(e.target.value)}
                                    />
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">عنوان باکس دانلود</span>
                                </div>

                                <div className="w-full relative flex items-center justify-center gap-1">
                                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={linkType} onChange={e => setLinkType(e.target.value)} >
                                        <option value="dubbed">دوبله</option>
                                        <option value="subtitle">زیرنویس</option>
                                        <option value="mainLanguage">زبان اصلی</option>
                                    </select>
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">نوع باکس دانلود</span>
                                </div>

                                <button
                                    className="md:col-start-1 md:col-end-3 py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                    onClick={addLink}
                                >افزودن</button>
                            </div>

                            {links.length !== 0 && (
                                <div className="w-full flex flex-col items-center gap-2">
                                    <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">لینک های فیلم</h3>
                                    <div className="w-full flex flex-col items-center gap-2">
                                        {links.map(link => (
                                            <div className="w-full bg-gray-200 dark:bg-secondary flex items-center justify-between px-2 py-1 rounded-lg">
                                                <div className="flex items-end justify-center gap-1">
                                                    <h3 className="text-light-gray dark:text-white font-shabnam">{link.title}</h3>
                                                    <span className="text-gray-400 text-sm dark:text-gray-500 font-shabnam-light">{link.type}</span>
                                                </div>
                                                <button
                                                    className="p-1 bg-red-500 hover:bg-blackred-600 transition-colors rounded-sm cursor-pointer"
                                                    onClick={e => deleteLink(e, link.id)}
                                                >
                                                    <RxCross2 className="text-white dark:text-primary" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                        <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">ساخت تگ جدید</h3>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="w-full py-5 px-4 border border-gray-200 dark:border-secondary rounded-md grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                    <input
                                        type="text"
                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={tagTitle}
                                        onChange={e => setTagTitle(e.target.value)}
                                    />
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">عنوان تگ</span>
                                </div>

                                <button
                                    className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                    onClick={addTag}
                                >افزودن</button>
                            </div>

                            {tags.length !== 0 && (
                                <div className="w-full flex flex-col items-center gap-2">
                                    <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">تگ های فیلم</h3>
                                    <div className="w-full flex flex-col items-center gap-2">
                                        {tags.map(tag => (
                                            <div className="w-full bg-gray-200 dark:bg-secondary flex items-center justify-between px-2 py-1 rounded-lg">
                                                <h3 className="text-light-gray dark:text-white font-shabnam">{tag}</h3>
                                                <button
                                                    className="p-1 bg-red-500 hover:bg-blackred-600 transition-colors rounded-sm cursor-pointer"
                                                    onClick={e => deleteTag(e, tag)}
                                                >
                                                    <RxCross2 className="text-white dark:text-primary" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* similar Movies */}
                    <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 rounded-lg py-2 px-3">
                        <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">افزودن فيلم هاي مشابه</h3>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                    <input
                                        type="text"
                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={similarMovieId}
                                        onChange={e => {
                                            setSimilarMovieId(e.target.value)
                                            setShowSimilarMovies(true)

                                        }}
                                    />
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Id فيلم مورد نظر</span>

                                    {/* to suggest movies by their Id */}
                                    <ul className={`absolute top-15 z-30 max-h-36 overflow-y-auto ${showSimilarMovies ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'} transition-all w-full rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 py-4 px-5 bg-gray-200  dark:bg-primary`}>
                                        {movieIsPending && (
                                            <h2 className="md:col-start-1 md:col-end-4 text-center font-vazir text-red-500 text-sm md:text-base mt-2">در حال دریافت اطلاعات فیلم ها ... </h2>
                                        )}

                                        {movieError && (
                                            <h2 className="md:col-start-1 md:col-end-4 text-center font-vazir text-red-500 text-sm md:text-base mt-2">{movieError?.message} </h2>
                                        )}

                                        {!movieIsPending && (
                                            <>
                                                {moviesArray.filter(movie => movie.id == similarMovieId).length !== 0 ? moviesArray.filter(movie => movie.id == similarMovieId).map(movie => (
                                                    <li
                                                        className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center flex items-center justify-start gap-4"
                                                        onClick={e => {
                                                            setShowSimilarMovies(false)
                                                            setSimilarMovieId(movie.id)
                                                        }}
                                                    >
                                                        <div className="w-15 h-15 overflow-hidden rounded-md">
                                                            <img src={movie.cover} alt="" className="w-full h-full object-center object-cover" />
                                                        </div>

                                                        <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{movie.title}</span>
                                                    </li>
                                                )) :
                                                    <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">فیلمی با ID برابر "{similarMovieId}" وجود ندارد</div>
                                                }

                                            </>
                                        )}
                                    </ul>
                                </div>

                                <button
                                    className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                    onClick={addSimilarMovie}
                                >افزودن</button>
                            </div>

                            {similarMovies.length !== 0 && (
                                <div className="w-full flex flex-col items-center gap-2">
                                    <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">فیلم مشابه</h3>
                                    <div className="w-full flex flex-col items-center gap-2">
                                        {similarMovies.map(movie => (
                                            <div className="w-full bg-gray-200 dark:bg-primary flex items-center justify-between px-2 py-1 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-15 h-15 overflow-hidden rounded-md">
                                                        <img src={movie.cover} alt="" className="w-full h-full object-center object-cover" />
                                                    </div>
                                                    <h3 className="text-light-gray dark:text-white font-shabnam">{movie.title}</h3>
                                                </div>

                                                <button
                                                    className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                                    onClick={e => deleteSimilarMovie(e, movie.id)}
                                                >
                                                    <RxCross2 className="text-white dark:text-secondary" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cast */}
                    <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 rounded-lg py-2 px-3">
                        <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">افزودن عوامل و بازیگر</h3>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="w-full relative select-none">
                                    <input
                                        type="text"
                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={castName}
                                        onChange={e => setCastName(e.target.value)}
                                    />
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام بازیگر</span>

                                    {/* to suggest casts by their name */}
                                    <ul className={`absolute top-15 z-30 max-h-36 overflow-y-auto ${showCasts ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'} transition-all w-full rounded-md grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 py-4 px-5 bg-gray-200  dark:bg-primary`}>
                                        {castIsPending && (
                                            <h2 className="md:col-start-1 md:col-end-3 text-center font-vazir text-red-500 text-sm md:text-base mt-2">در حال دریافت اطلاعات هنرپيشه ها ... </h2>
                                        )}

                                        {castError && (
                                            <h2 className="md:col-start-1 md:col-end-3 text-center font-vazir text-red-500 text-sm md:text-base mt-2">{castError?.message} </h2>
                                        )}

                                        {!castIsPending && (
                                            <>
                                                {castsArray.length != 0 &&
                                                    castsArray?.filter(cast => cast.fullName.toLowerCase().startsWith(castName.toLowerCase())).length !== 0 ? castsArray?.filter(cast => cast.fullName.toLowerCase().startsWith(castName.toLowerCase())).map(cast => (
                                                        <li
                                                            className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center flex items-center justify-start gap-4"
                                                            onClick={e => {
                                                                setShowCasts(false)
                                                                setCastName(cast.fullName)
                                                                setCastId(cast.id)
                                                            }}
                                                        >
                                                            <div className="w-15 h-15 overflow-hidden rounded-md">
                                                                <img src={cast.src} alt="" className="w-full h-full object-center object-cover" />
                                                            </div>

                                                            <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{cast.fullName}</span>
                                                        </li>
                                                    )) : (
                                                    <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">بازیگر/عوامل  "{castName}" وجود ندارد ابتدا آن را به لیست عوامل و بازیگران در تب آن اضافه کنید</div>
                                                )}
                                            </>
                                        )}
                                    </ul>
                                </div>

                                <div className="w-full relative select-none">
                                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={castRole} onChange={e => setCastRole(e.target.value)} >
                                        <option value="actor">بازیگر</option>
                                        <option value="writer">نویسنده</option>
                                        <option value="director">کارگردان</option>
                                        <option value="musicoun">موسیقی دان</option>
                                        <option value="voiceActor">صداپیشه</option>
                                    </select>
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نقش</span>
                                </div>

                                <button
                                    className="py-2 md:col-start-1 md:col-end-3 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                    onClick={addCast}
                                >افزودن</button>
                            </div>

                            {movieCasts.length !== 0 && (
                                <div className="w-full bg-gray-100 dark:bg-primary rounded-lg py-2 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                    {movieCasts.map(cast => (
                                        <li
                                            className="rounded-md border border-white dark:border-secondary transition-all py-2 px-1 text-center inline-flex items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center justify-center gap-1">
                                                <span className="text-sm font-vazir text-light-gray dark:text-white">{cast.fullName}</span>
                                                <span className="text-xs font-vazir text-gray-400 dark:text-gray-500">{cast.role}</span>
                                            </div>
                                            <button
                                                className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                                onClick={e => deleteCast(e, cast.id)}
                                            >
                                                <RxCross2 className="text-white !cursor-pointer" />
                                            </button>
                                        </li>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notifs */}
                    <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 rounded-lg py-2 px-3">
                        <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">افزودن اعلان ها</h3>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                    <input
                                        type="text"
                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={notifTitle}
                                        onChange={e => setNotifTitle(e.target.value)}
                                    />
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان اعلان</span>
                                </div>

                                <button
                                    className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                    onClick={addNotif}
                                >افزودن</button>
                            </div>

                            {notifs.length !== 0 && (
                                <div className="w-full flex flex-col items-center gap-2">
                                    <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">اعلان های فیلم</h3>
                                    <div className="w-full flex flex-col items-center gap-2">
                                        {notifs.map(notif => (
                                            <div className="w-full bg-gray-200 dark:bg-primary flex items-center justify-between px-2 py-1 rounded-lg">
                                                <h3 className="text-light-gray dark:text-white font-shabnam">{notif}</h3>
                                                <button
                                                    className="p-1 bg-red-500 hover:bg-blackred-600 transition-colors rounded-sm cursor-pointer"
                                                    onClick={e => deleteNotif(e, notif)}
                                                >
                                                    <RxCross2 className="text-white dark:text-primary" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button className="md:col-start-1 md:col-end-3 w-full bg-green-600 hover:bg-green-500 disabled:bg-green-300 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer" disabled={isAdding}>
                        {isAdding ? 'در حال افزودن فیلم ...' : 'افزودن فیلم'}
                    </button>
                </form>

            )}
        </div >
    )
}

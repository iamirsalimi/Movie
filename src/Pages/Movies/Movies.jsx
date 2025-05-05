import React, { useState } from 'react'

const genres = {
    'movie': ['اکشن', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'ماجراجویی', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی'],
    'series': ['اکشن', 'Talk-Show', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'ماجراجویی', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی', 'موسیقی']
}

export default function Movies() {
    const [subtitleCheckbox, setSubtitleCheckbox] = useState(false)
    const [dubbedCheckbox, setDubbedCheckbox] = useState(false)
    const [isInHeaderSliderCheckbox, setIsInHeaderSliderCheckbox] = useState(false)
    const [isInNewMoviesCheckbox, setIsInNewMoviesCheckbox] = useState(false)
    const [movieType, setMovieType] = useState('movie')

    const [linkTitle , setLinkTitle] = useState()
    const [linkType , setLinkType] = useState()
    const [links , setLinks] = useState([])

    const addLink = e => {
        e.preventDefault()
        let newLinkObj = {title : linkTitle , type: linkType , links : []}
        setLinks(prev => [...prev , newLinkObj])
    }

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <div className="w-full panel-box py-4 px-5 flex flex-col gap-7">
                <h2 className="w-full font-vazir text-gray-800 dark:text-white text-xl">افزودن فیلم جدید</h2>
                <form action="" className="w-full grid grid-cols-2 gap-5">

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام فیلم</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان اصلی فیلم</span>
                    </div>

                    <div className="w-full relative flex items-center justify-center gap-1">
                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={movieType} onChange={e => setMovieType(e.target.value)}>
                            <option value="movie">فیلم</option>
                            <option value="series">سریال</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نوع فیلم</span>
                    </div>

                    <div className="w-full relative flex items-center justify-center gap-1">
                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value="">
                            <option value="">G</option>
                            <option value="">PG</option>
                            <option value="">PG-13</option>
                            <option value="">R</option>
                            <option value="">NC-17</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">رده سنی</span>
                    </div>

                    <div className="col-start-1 col-end-3 w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ژانر</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            min={1900}
                            max={2050}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">سال انتشار</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">شبکه</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            min={0}
                            max={10}
                            step={0.1}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">IMDb</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            min={0}
                            max={100}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Rotten Tomatoes</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            min={0}
                            max={100}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Metacritic</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">محصول</span>
                    </div>

                    <div className="col-start-1 col-end-3 w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">تگ ها</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">کیفیت</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">وضعیت پخش</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">مدت زمان (دقیقه)</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">سال هاي پخش</span>
                    </div>

                    <div className="col-start-1 col-end-3 w-full relative select-none">
                        <textarea className="w-full rounded-md p-3 min-h-28 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        ></textarea>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">توضیحات</span>
                    </div>

                    <div className="col-start-1 col-end-3 w-full relative grid grid-cols-2 gap-y-5">
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="subtitle-checkbox" type="checkbox" value="" className="peer" hidden checked={subtitleCheckbox} onChange={e => setSubtitleCheckbox(e.target.checked)} />
                            <label htmlFor="subtitle-checkbox" className="flex items-center gap-2">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">زیرنویس</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${subtitleCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="dubbed-checkbox" type="checkbox" value="" className="peer" hidden checked={dubbedCheckbox} onChange={e => setDubbedCheckbox(e.target.checked)} />
                            <label htmlFor="dubbed-checkbox" className="flex items-center gap-2">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">دوبله</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${dubbedCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="isInHeaderSlider-checkbox" type="checkbox" value="" className="peer" hidden checked={isInHeaderSliderCheckbox} onChange={e => setIsInHeaderSliderCheckbox(e.target.checked)} />
                            <label htmlFor="isInHeaderSlider-checkbox" className="flex items-center gap-2">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">درون اسلایدر هدر باشد؟</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${isInHeaderSliderCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="isInNewMovies-checkbox" type="checkbox" value="" className="peer" hidden checked={isInNewMoviesCheckbox} onChange={e => setIsInNewMoviesCheckbox(e.target.checked)} />
                            <label htmlFor="isInNewMovies-checkbox" className="flex items-center gap-2">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">درون جدیدترین فیلم ها باشد؟</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${isInNewMoviesCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                    </div>

                    <div className="col-start-1 col-end-3 flex flex-col gap-5 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                        <h3 className="w-full font-vazir text-gray-800 dark:text-white text-lg">لینک های فیلم</h3>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="w-full py-5 px-4 border border-gray-200 dark:border-secondary rounded-md grid grid-cols-2 gap-5">
                                <div className="w-full relative select-none">
                                    <input
                                        type="text"
                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={linkTitle}
                                        onChange={e => setLinkTitle(e.target.value.trim())}
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
                                    className="col-start-1 col-end-3 py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                    onClick={addLink}
                                >افزودن</button>
                            </div>

                        </div>
                    </div>

                    <div className="col-start-1 col-end-3 w-full flex items-center gap-2">
                        <button className="w-full bg-sky-600 hover:bg-sky-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">افزودن</button>
                        <button className="w-full bg-red-600 hover:bg-red-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">ريست</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

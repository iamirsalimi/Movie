import React, { useState } from 'react'

import { useParams } from 'react-router-dom';

import { MdKeyboardArrowRight } from "react-icons/md";

export default function EditUser() {
    const [vipTab, setVipTab] = useState('increase-vipPlan')

    const { userId } = useParams()

    const [userRule, setUserRule] = useState('user') // user or admin
    const [accountStatus, setAccountStatus] = useState('active')

    const changeVipTab = e => {
        setVipTab(e.target.dataset.viptab)
    }

    return (
        <div className="w-full panel-box py-4 px-5 flex flex-col gap-7 overflow-hidden mb-20 md:mb-10">
            <div className="flex items-center justify-center">
                <div className=" w-full flex items-center gap-2">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">آپدیت کاربر</h2>
                    <span className="text-sm text-gray-300 dark:text-gray-500 hidden md:inline">#{userId}</span>
                </div>
                <a href="/my-account/adminPanel/users" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست کاربرها</span>
                </a>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام کاربری</span>
                </div>

                <div className="w-full relative flex items-center justify-center gap-1">
                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={userRule} onChange={e => setUserRule(e.target.value)}>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نقش کاربر</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ایمیل</span>
                </div>

                <div className="md:col-start-1 md:col-end-3 bg-gray-100 dark:bg-primary rounded-lg py-4 px-5 flex flex-col gap-7">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">حساب کاربر</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className={`${accountStatus == 'temporary-ban' ? '' : 'md:col-start-1 md:col-end-3'} relative flex items-center justify-center gap-1`}>
                            <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={accountStatus} onChange={e => setAccountStatus(e.target.value)}>
                                <option value="active">فعال</option>
                                <option value="temporary-ban">بن موقت</option>
                                <option value="permanent-ban">بن دایمی</option>
                            </select>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">وضعیت حساب کاربر</span>
                        </div>

                        {accountStatus == 'temporary-ban' && (
                            <div className="w-full relative flex items-center justify-center gap-1">
                                <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors">
                                    <option value="month-1">1 ماه</option>
                                    <option value="month-3">3 ماه</option>
                                    <option value="month-6">6 ماه</option>
                                    <option value="month-12">12 ماه</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">مدت زمان بن</span>
                            </div>
                        )}

                        {(accountStatus == 'temporary-ban' || accountStatus == 'permanent-ban') && (
                            <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                <textarea className="w-full rounded-md p-3 min-h-28 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                ></textarea>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">علت بن</span>
                            </div>
                        )}

                        <button className="md:col-start-1 md:col-end-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-white cursor-pointer font-vazir">ذخیره</button>
                    </div>
                </div>

                <div className="md:col-start-1 md:col-end-3 bg-gray-100 dark:bg-primary rounded-lg py-4 px-5 flex flex-col gap-7">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">اشتراک</h2>
                    <div className="w-full flex flex-col items-center gap-5">
                        <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white py-2 px-4 border border-gray-300 dark:border-secondary divide-y divide-gray-300 dark:divide-secondary rounded-md">
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">اشتراك :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">دارد</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">نوع اشتراك فعال :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">3 ماهه</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ فعال شدن اشتراك :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">20/2/1404</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ منقضي شدن اشتراك :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">20/5/1404</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">هزینه پرداخت شده :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">200000 تومان</span>
                            </li>
                        </ul>

                        <div className="w-full flex flex-col items-center">
                            <div className="flex items-center justify-center gap-1 md:gap-2">
                                <button
                                    className={`cursor-pointer font-shabnam px-2 py-1 rounded-t-md text-xs sm:text-sm ${vipTab == 'activate-vipPlan' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-400 hover:bg-black/20 dark:bg-secondary text-white'} transition-colors`}
                                    onClick={changeVipTab}
                                    data-vipTab='activate-vipPlan'
                                >فعالسازی اشتراک</button>
                                <button
                                    className={`cursor-pointer font-shabnam px-2 py-1 rounded-t-md text-xs sm:text-sm ${vipTab == 'increase-vipPlan' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-400 hover:bg-black/20 dark:bg-secondary text-white'} transition-colors`}
                                    onClick={changeVipTab}
                                    data-vipTab='increase-vipPlan'
                                >افزایش اشتراک(کاستوم)</button>
                                <button
                                    className={`cursor-pointer font-shabnam px-2 py-1 rounded-t-md text-xs sm:text-sm ${vipTab == 'decrease-vipPlan' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-400 hover:bg-black/20 dark:bg-secondary text-white'} transition-colors`}
                                    onClick={changeVipTab}
                                    data-vipTab='decrease-vipPlan'
                                >کاهش اشتراک(کاستوم)</button>
                            </div>
                            <div className="w-full border border-gray-400 dark:border-secondary rounded-lg py-5 px-7 flex flex-col gap-5">
                                {vipTab !== 'activate-vipPlan' ? (
                                    <>
                                        {vipTab == 'increase-vipPlan' ? (
                                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg text-center md:text-justify">افزایش اشتراک</h2>
                                        ) : (
                                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg text-center md:text-justify">کاهش اشتراک</h2>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="md:col-start-1 md:col-end-3 relative select-none">
                                                <input
                                                    type="number"
                                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                                    min={1}
                                                />
                                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">تعداد روز</span>
                                            </div>
                                            <button className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-colors text-white cursor-pointer font-vazir">محاسبه روز انقضا</button>
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-gray-700 dark:text-white font-vazir text-lg">فعال سازی اشتراک</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="md:col-start-1 md:col-end-3 relative select-none">
                                                <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors">
                                                    <option value="month-1">1 ماهه</option>
                                                    <option value="month-3">3 ماهه</option>
                                                    <option value="month-6">6 ماهه</option>
                                                    <option value="month-12">1 ساله</option>
                                                </select>
                                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">نوع اشتراک</span>
                                            </div>
                                            <button className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-colors text-white cursor-pointer font-vazir">محاسبه روز انقضا</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">محصول</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">وضعیت</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">کیفیت</span>
                </div>

                <div className="w-full relative select-none">
                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" >
                        <option value="">در حال پخش</option>
                        <option value="">اتمام</option>
                        <option value="">کنسل شده</option>
                    </select>

                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">وضعیت پخش</span>
                </div>

                <div className="w-full relative select-none">
                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" >
                        <option value="saturday">شنبه</option>
                        <option value="sunday">یکشنبه</option>
                        <option value="monday">دوشنبه</option>
                        <option value="tuesday">سه شنبه</option>
                        <option value="wednsday">چهارشنبه</option>
                        <option value="thursday">پنجشنبه</option>
                        <option value="friday">جمعه</option>
                    </select>

                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">روز پخش</span>
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
                </div> */}


                {/* <div className="col-start-1 col-end-3 flex flex-col gap-5 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-lg">ساخت لینک جدید</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-secondary rounded-md grid grid-cols-2 gap-5">
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
                                className="col-start-1 col-end-3 py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
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
                                                onClick={e => deleteLink(link.id)}
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
                <div className="col-start-1 col-end-3 flex flex-col gap-5 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-lg">ساخت تگ جدید</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-secondary rounded-md grid grid-cols-3 gap-5">
                            <div className="col-start-1 col-end-3 w-full relative select-none">
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
                                                onClick={e => deleteTag(tag)}
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
                <div className="col-start-1 col-end-3 flex flex-col gap-5 rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-lg">افزودن فيلم هاي مشابه</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-3 gap-5">
                            <div className="col-start-1 col-end-3 w-full relative select-none">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={similarMovieId}
                                    onChange={e => setSimilarMovieId(e.target.value)}
                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Id فيلم مورد نظر</span>
                                <ul className={`absolute top-15 z-30 max-h-36 overflow-y-auto ${showSimilarMovies ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'} transition-all w-full rounded-md grid grid-cols-2 gap-x-2 gap-y-4 py-4 px-5 bg-gray-200  dark:bg-primary`}>
                                    {movies.filter(movie => movie.id == similarMovieId).length !== 0 ? movies.filter(movie => movie.id == similarMovieId).map(movie => (
                                        <li
                                            className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center flex items-center justify-start gap-4"
                                            onClick={e => {
                                                setShowSimilarMovies(false)
                                                setSimilarMovieId(movie.id)
                                            }}
                                        >
                                            <div className="w-15 h-15 overflow-hidden rounded-md">
                                                <img src={movie.src} alt="" className="w-full h-full object-center object-cover" />
                                            </div>

                                            <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{movie.title}</span>
                                        </li>
                                    )) :
                                        <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">فیلم "{similarMovieId}" وجود ندارد</div>
                                    }
                                </ul>
                            </div>

                            <button
                                className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                onClick={addSimilarMovie}
                            >افزودن</button>
                        </div>

                        {similarMovies.length !== 0 && (
                            <div className="w-full flex flex-col items-center gap-2">
                                <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">لینک های فیلم</h3>
                                <div className="w-full flex flex-col items-center gap-2">
                                    {similarMovies.map(movie => (
                                        <div className="w-full bg-gray-200 dark:bg-primary flex items-center justify-between px-2 py-1 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <div className="w-15 h-15 overflow-hidden rounded-md">
                                                    <img src={movie.src} alt="" className="w-full h-full object-center object-cover" />
                                                </div>
                                                <h3 className="text-light-gray dark:text-white font-shabnam">{movie.title}</h3>
                                            </div>

                                            <button
                                                className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                                onClick={e => deleteSimilarMovie(movie.id)}
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
                <div className="col-start-1 col-end-3 flex flex-col gap-5 rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-lg">افزودن عوامل و بازیگر</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-2 gap-5">
                            <div className="w-full relative select-none">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={castName}
                                    onChange={e => setCastName(e.target.value)}
                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام بازیگر</span>
                                <ul className={`absolute top-15 z-30 max-h-36 overflow-y-auto ${showCasts ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'} transition-all w-full rounded-md grid grid-cols-2 gap-x-2 gap-y-4 py-4 px-5 bg-gray-200  dark:bg-primary`}>
                                    {casts.filter(cast => cast.name.toLowerCase().startsWith(castName.toLowerCase())).length !== 0 ? casts.filter(cast => cast.name.toLowerCase().startsWith(castName.toLowerCase())).map(cast => (
                                        <li
                                            className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center flex items-center justify-start gap-4"
                                            onClick={e => {
                                                setShowCasts(false)
                                                setCastName(cast.name)
                                                setCastId(cast.id)
                                            }}
                                        >
                                            <div className="w-15 h-15 overflow-hidden rounded-md">
                                                <img src={cast.src} alt="" className="w-full h-full object-center object-cover" />
                                            </div>

                                            <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{cast.name}</span>
                                        </li>
                                    )) :
                                        <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">بازیگر/عوامل  "{castName}" وجود ندارد ابتدا آن را به لیست عوامل و بازیگران در تب آن اضافه کنید</div>
                                    }
                                </ul>
                            </div>

                            <div className="w-full relative select-none">
                                <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={castRule} onChange={e => setCastRule(e.target.value)} >
                                    <option value="actor">بازیگر</option>
                                    <option value="writer">نویسنده</option>
                                    <option value="director">کارگردان</option>
                                    <option value="musicoun">موسیقی دان</option>
                                    <option value="voiceActor">صداپیشه</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نقش</span>
                            </div>

                            <button
                                className="py-2 col-start-1 col-end-3 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                onClick={addCast}
                            >افزودن</button>
                        </div>

                        {movieCasts.length !== 0 && (
                            <div className="w-full bg-gray-100 dark:bg-primary rounded-lg py-2 px-4 grid grid-cols-4 gap-2">
                                {movieCasts.map(cast => (
                                    <li
                                        className="rounded-md border border-white dark:border-secondary transition-all py-2 px-1 text-center inline-flex items-center justify-center gap-4"
                                    >
                                        <span className="text-sm font-vazir text-light-gray dark:text-white">{cast.name}</span>
                                        <span className="text-xs font-vazir text-gray-400 dark:text-gray-500">{cast.rule}</span>
                                        <button
                                            className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                            onClick={e => deleteCast(cast.id)}
                                        >
                                            <RxCross2 className="text-white !cursor-pointer" />
                                        </button>
                                    </li>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-start-1 col-end-3 flex flex-col gap-5 rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-lg">افزودن اعلان ها</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-3 gap-5">
                            <div className="col-start-1 col-end-3 w-full relative select-none">
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
                                        <div className="w-full bg-gray-200 dark:bg-secondary flex items-center justify-between px-2 py-1 rounded-lg">
                                            <h3 className="text-light-gray dark:text-white font-shabnam">{notif}</h3>
                                            <button
                                                className="p-1 bg-red-500 hover:bg-blackred-600 transition-colors rounded-sm cursor-pointer"
                                                onClick={e => deleteNotif(notif)}
                                            >
                                                <RxCross2 className="text-white dark:text-primary" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div> */}

                <button className="md:col-start-1 md:col-end-3 w-full bg-green-600 hover:bg-green-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">آپدیت کاربر</button>
            </div>
        </div >
    )
}
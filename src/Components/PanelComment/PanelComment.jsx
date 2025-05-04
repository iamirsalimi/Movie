import React from 'react'


export default function PanelComment() {
    return (
        <div className="flex flex-col items-center gap-5 bg-gray-100 dark:bg-primary rounded-lg border-r-4 px-3 py-2 border-sky-500">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="overflow-hidden rounded-md w-full h-36 lg:min-w-28 lg:h-28">
                        <img src="/src/assets/Movies-Form.jpg" alt="" className="h-full w-full object-center object-cover" />
                    </div>
                    <div className="flex flex-row lg:flex-col items-center gap-2">
                        <span className="border border-white dark:border-secondary text-nowrap text-red-500 font-vazir text-center rounded-sm w-full text-xs px-2 py-1">دیدگاه دارای اسپویل می باشد</span>
                        <span className="border border-white dark:border-secondary text-nowrap text-green-500 font-vazir text-center rounded-sm w-full text-xs px-2 py-1">تایید شده</span>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-1">
                    <a className="font-vazir cursor-pointer text-sky-500">دانلود فیلم Dark Knight شوالیه تاریکی</a>
                    <span className="text-gray-400 dark:text-gray-600 font-vazir-light text-sm">2 سال پیش</span>
                    <p className="text-light-gray dark:text-gray-400 font-vazir-light text-sm text-center lg:text-justify">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
                </div>
            </div>


            {/* replies */}
            <div className="flex flex-col items-center lg:flex-row lg:items-start gap-2 pt-5 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-light-gray dark:text-gray-300 font-vazir text-nowrap">پاسخ ها</h2>
                <div className="flex flex-col items-center gap-2 bg-white dark:bg-secondary rounded-lg py-4 px-5">

                    <div className="flex flex-col lg:flex-row gap-4 border border-gray-200 dark:border-primary px-3 py-2 rounded-md">
                        <div className="flex flex-col items-center gap-2">
                            <div className="overflow-hidden rounded-md w-full h-36 lg:min-w-28 lg:h-28">
                                <img src="/src/assets/Movies-Form.jpg" alt="" className="h-full w-full object-center object-cover" />
                            </div>
                            <div className="flex flex-row lg:flex-col items-center gap-2">
                                <span className="border border-gray-200 dark:border-primary text-nowrap text-red-500 font-vazir text-center rounded-sm w-full text-xs px-2 py-1">دیدگاه دارای اسپویل می باشد</span>
                                <span className="border border-gray-200 dark:border-primary text-nowrap text-green-500 font-vazir text-center rounded-sm w-full text-xs px-2 py-1">تایید شده</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center lg:items-start gap-1">
                            <a className="font-vazir cursor-pointer text-sky-500">دانلود فیلم Dark Knight شوالیه تاریکی</a>
                            <span className="text-gray-400 dark:text-gray-600 font-vazir-light text-sm">2 سال پیش</span>
                            <p className="text-light-gray dark:text-gray-400 font-vazir-light text-sm text-center lg:text-justify">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

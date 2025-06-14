import { useContext, useEffect } from 'react'

import WithPageContent from './../../HOCs/WithPageContent'
import LoadingContext from './../../Contexts/LoadingContext'
import MoviesContext from './../../Contexts/MoviesContext'

function Faq() {
    const { setLoading } = useContext(LoadingContext)
    const { movies } = useContext(MoviesContext)

    useEffect(() => {
        if (movies?.length > 0)
            setLoading(false)
    }, [movies])

    return (
        <div className="rounded-xl py-5 px-4 bg-white shadow shadow-black/5  dark:bg-secondary flex flex-col items-center lg:items-start gap-7">
            <h2 className="text-gray-700 dark:text-white text-2xl font-vazir font-bold">سوالات متداول</h2>
            <div className="flex flex-col gap-2">
                <h3 className="text-gray-600 dark:text-gray-100 font-vazir text-center lg:text-justify">چرا زمانی که بر روی لینک دانلود کلیک می‌کنم دانلود نمی‌شود یا بصورت آنلاین پخش می‌شود؟</h3>
                <p className="text-light-gray dark:text-gray-400 font-vazir-light text-center lg:text-justify">
                    دانلود  Movie Website تنها با برنامه‌ها مدیریت دانلود امکان‌پذیر می‌باشد، به دلیل قوانین جدید گوگل امکان دانلود فایل های حجیم بصورت مستقیم بر روی مرورگر وجود ندارد. به همین منظور کافیست لینک دانلود فیلم مورد نظر خود را از سایت کپی کرده (بر روی لینک کلیک راست کنید یا طولانی لمس نمایید سپس Copy link address) و در دانلود منیجرهای معرفی شده وارد نمایید. (برای دانلود V.p.n خود را خاموش کنید)
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-gray-600 dark:text-gray-100 font-vazir text-center lg:text-justify">چرا در زمان عضویت با خطا مواجهه می‌شوم و نمی‌توانم عضو شوم؟</h3>
                <p className="text-light-gray dark:text-gray-400 text-center font-vazir-light lg:text-justify">
                    نام کاربری غیر مجاز است که به دو دلیل است که در زیر خواهیم دید: – کاراکترهای غیرمجاز: فاصله (space) و سایر کاراکتر‌ها )) …! ? * & @ – نام کاربری تکراری: یک نام کاربری رو دو نفر نمیتوانن استفاده کنن و نام کاربری های رند مثل اسم رو با توجه به تعداد عضو های بالا قبلا ثبت شده برای تکراری نبودن آخر نام کاربری عدد اضافه کنید یا حروفی که تکراری نباشد. – حداقل ۴ حرف را وارد کنید ایمیل صحیح نیست که به دو دلیل است که در زیر خواهیم دید: – قبل از هر چیزی باید بدونید ایمیل همان پست الکترونیک شماست و بایستی بدون www وارد شود. اگر ایمیل یا پست الکترونیک صحیح نزنید در موقع فراموشی رمز عبور و بازیابی اکانت با مشکل مواجه خواهید شد. – در ایمیل خود فاصله (space) نزارید هیچ ایمیلی فاصله بین حروف نداره.
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-gray-600 dark:text-gray-100 font-vazir text-center lg:text-justify">فیلم یا سریال را دانلود کرده‌ام ولی زیرنویس ندارد؟</h3>
                <p className="text-light-gray dark:text-gray-400 text-center font-vazir-light lg:text-justify">
                    چنانچه نسخه های سافت ساب (SoftSub) را دانلود نموده اید ، در دستگاه یا پلیر خود ، از منوی تنظیمات ، منوی Subtitle ، چک نموده گزینه زیرنویس فعال باشد و زبان زیرنویس بر روی فارسی (PER or FA) باشد، درصورتی که موفق به پخش زیرنویس در دستگاه خود نشدید ممکن است دستگاه شما از این نوع زیرنویس پشتیبانی نکند.
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-gray-600 dark:text-gray-100 font-vazir text-center lg:text-justify">نسخه های سافت‌ساب (SoftSub) با نسخه‌های هاردساب (HardSub) چه تفاوتی دارد؟</h3>
                <ul className="text-light-gray dark:text-gray-400 space-y-5 text-center font-vazir-light lg:text-justify">
                    <li>
                        – در نسخه های هاردساب (HardSub) زیرنویس جزوی از تصویر است ، امکان غیرفعال کردن یا اعمال تغییرات در زیرنویس وجود ندارد ولی زیرنویس در تمامی دستگاه هایی که بتوانند فایل های Mp4 را پخش کنند اجرا خواهد شد. (Mp4 رایج ترین فایل پشتیبانی شده در ۹۹ درصد دستگاه ها میباشد).
                    </li>
                    <li>
                        – در نسخه های سافت ساب (SoftSub) زیرنویس هماهنگ با فایل فیلم ادقام شده و شما میتوانید زیرنویس را غیر فعال یا تغییر دهید یا رنگ و اندازه زیرنویس را تغییر دهید (در صورت پشتیبانی دستگاه یا پلیر) اما ممکن است بعضی دستگاه ها ازین نوع زیرنویس پشتیبانی نکنند.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-gray-600 dark:text-gray-100 font-vazir text-center lg:text-justify">اشتراک خریده‌ام اما اشتراک من فعال نشده است؟</h3>
                <p className="text-light-gray dark:text-gray-400 text-center font-vazir-light lg:text-justify">
                    در زمان خرید اشتراک پس از پرداخت باید صبر نمایید تا بصورت اتومات به سایت هدایت شوید ، اگر به هر دلیل بازگشت به سایت با موفقیت انجام نشود ، تراکنش شما ناموفق میشود و مبلغ کسر شده نهایت تا ۷۲ ساعت آینده به حساب شما باز خواهد گشت. همچنین در هنگام خرید V.P.N خود را حتما خاموش نمایید.
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-gray-600 dark:text-gray-100 font-vazir text-center lg:text-justify">من در خارج از کشور زندگی می‌کنم، در صورت خرید اشتراک امکان مشاهده دارم؟</h3>
                <p className="text-light-gray dark:text-gray-400 text-center font-vazir-light lg:text-justify">
                    به‌دلیل کپی‌رایت‌های متعدد و خطر بسته شدن سرور دانلود فعلا امکان دانلود برای کاربران خارج بسته شده و دانلود فقط محدود به IP ایران می‌باشد.                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-gray-600 dark:text-gray-100 font-vazir text-center lg:text-justify">پخش آنلاین برای من ارور می‌دهد چیکار باید بکنم؟</h3>
                <p className="text-light-gray dark:text-gray-400 text-center font-vazir-light lg:text-justify">
                    این ارور مربوط به غیر فعال بودن یا عدم پشتیبانی مرورگر شما از جاوا اسکریپت میباشد. در صورت امکان از مرورگر کروم یا فایرفاکس استفاده نمایید ، اگر از مرورگرهای ذکر شده استفاده می نمایید از تنظیمات مرورگر چک نمایید گزینه Java فعال باشد . سپس از بخش History تاریخچه مرورگر خود را بصورت کامل حذف کنید. همچنین این خطا در زمانی که اتصال شما ضعیف باشد نیز ممکن است رخ دهد مودم خود را خاموش روشن نموده و مجدد اقدام نمایید.
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-gray-600 dark:text-gray-100 font-vazir text-center lg:text-justify">بعد از ورود به سایت وقتی وارد صفحه‌ی فیلم یا سریالی می‌شوم، مجدد باید اقدام به لاگین کنم، مشکل از چیه؟</h3>
                <p className="text-light-gray dark:text-gray-400 text-center font-vazir-light lg:text-justify">
                    موقع لاگین به سایت حتما تیک گزینه‌ی مرا به‌خاطر بسپار را بزنید و وقتی وارد صفحه‌ی فیلم یا سریالی می‌شوید، کش مرورگر خود را پاک کنید تا این مشکل برطرف شود.
                </p>
            </div>

        </div>
    )

}
export default WithPageContent(Faq, true)
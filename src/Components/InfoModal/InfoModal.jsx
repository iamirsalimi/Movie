import React, { useContext } from 'react'

import FormContext from './../../Contexts/FormContext'

export default function InfoModal() {
    let { showModal, setShowModal } = useContext(FormContext)
    
    const hideMenu = () => {
        setShowModal(false)
    }

    return (
        <div className={`absolute w-full top-0 left-0 h-full z-50 flex items-center justify-center transition-all ${showModal ? 'visible' : 'invisible'}`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={hideMenu}></div>
            
            <div className={`w-[90%] sm:w-4/5 lg:w-1/3 fixed top-5 h-fit bg-white translate-y-12 py-7 px-5 rounded-xl dark:bg-primary flex flex-col items-center gap-7 transition-all duration-200 ${showModal ? 'scale-100' : 'scale-0'}`}>
                <h2 className="font-vazir text-red-500 font-bold text-xl text-center">نکاتی که قبل از ثبت نام باید به آنها توجه کنید</h2>
                
                <ul className="flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white">
                    <li className="text-center">نام كاربري نميتواند با اعداد شروع شود همچنين بايد حداقل 5 و حداكثر 16 كاراكتر باشد</li>
                    <li className="text-center">نام كاربري شما در بخش كامنت ها نمايش داده مي شود درصورتي كه لقب خود را مشخص نكرده باشيد. اين مقدار را ميتوانيد در حساب كاربري خود تغيير دهيد</li>
                    <li className="text-center">رمز عبور حداقل ميتواند 8 و حداکثر 16 کاراکتر می تواند باشد</li>
                    <li className="text-center">رمز عبور باید حداقل یک حرف کوچک ،حداقل یک حرف بزرگ ، حداقل یک کارکتر (یکی از مقادیر # و @ و _ و .) و حداقل یک عدد داشته باشد</li>
                    <li className="text-center">پس از وارد کردن ایمیل باید آن را وریفای کنید، پس مطمین شوید که آن را درست وارد می کنید</li>
                </ul>

                <button 
                    className="w-full py-2 rounded-md cursor-pointer font-vazir bg-red-500 hover:bg-red-600 transition-all text-white"
                    onClick={e => setShowModal(false)}    
                >متوجه شدم</button>
            </div>
        </div>
    )
}

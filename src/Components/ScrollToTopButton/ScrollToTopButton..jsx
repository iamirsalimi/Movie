import { useEffect, useState } from "react";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

export default function ScrollToTopButton() {
    const [btnShowFlag, setBtnShowFlag] = useState(false);

    useEffect(() => {
        const showBtn = () => {
            setBtnShowFlag(window.scrollY > 300);
        };

        window.addEventListener("scroll", showBtn);

        // Clean up : prevent Memory Leak
        return () => {
            window.removeEventListener("scroll", showBtn);
        };
    }, []);

    const goUpHandler = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className={`p-2 w-fit rounded-md border border-sky-600 text-white bg-sky-600 hover:bg-white hover:text-sky-600 dark:hover:bg-white dark:hover:border-white transition-all fixed bottom-10 right-7 cursor-pointer group ${btnShowFlag ? "translate-x-0 visible" : "translate-x-20 invisible"}`}
            onClick={goUpHandler}
        >
            <MdOutlineKeyboardDoubleArrowUp className="text-white group-hover:text-sky-600 transition-all text-xl" />
        </button>
    );
}

import React, { useState } from 'react';

export default function Tooltip({ children, text, position = "top" }) {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
    };

    const arrowClasses = {
        top: "top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 dark:border-t-gray-200",
        bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800 dark:border-b-gray-200",
        left: "left-full top-1/2 transform -translate-y-1/2 border-l-gray-800 dark:border-l-gray-200",
        right: "right-full top-1/2 transform -translate-y-1/2 border-r-gray-800 dark:border-r-gray-200"
    };

    return (
        <div 
            className="relative inline-block w-fit max-h-min"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`absolute z-50 ${positionClasses[position]}`}>
                    <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs px-2 py-1 rounded whitespace-nowrap font-vazir">
                        {text}
                        <div className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}></div>
                    </div>
                </div>
            )}
        </div>
    );
}
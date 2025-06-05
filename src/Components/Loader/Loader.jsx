import React from 'react'

import './loader.css'

export default function Loader({words}) {
    return (
        <div className="fixed top-0 left-0 z-50 bg-white dark:bg-primary h-screen w-screen flex items-center justify-center transition-all">
            <div className="card">
                <div className="loader text-light-gray dark:text-white">
                    <div className="words">
                        {words.map(word => (
                            <span className="word text-sky-500">{word}</span>
                        ))}
                    </div>
                    <p>Loading</p>
                </div>
            </div>
        </div>
    )
}

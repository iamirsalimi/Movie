import { useContext, useEffect } from 'react'

import WithPageContent from './../../HOCs/WithPageContent'
import LoadingContext from '../../Contexts/LoadingContext'
import MoviesContext from '../../Contexts/MoviesContext'


function Dmca(){
    let { setLoading } = useContext(LoadingContext) 
    let { movies } = useContext(MoviesContext) 

    useEffect(() => {
        if(movies.length > 0){
            setLoading(false)
        }
    } , [movies])
    
    return (
        <div className="rounded-xl py-5 px-4 bg-white shadow shadow-black/5  dark:bg-secondary flex flex-col items-center lg:items-start gap-2">
            <h2 className="text-gray-500 dark:text-white text-2xl font-bold">DMCA</h2>
            <p className="text-light-gray dark:text-gray-400 text-center lg:text-justify">
                Movie Website does not host or store any files on our server, we only linked to the media which is hosted on 3rd party services
                We just put link for Iranian users that can’t access any theater, so that we didn’t damage your sells
                For additional info & DMCA complaints, Use this email : <a href="movieWebsite.support@gmail.com:EMAIL?subject=Copy Right">movieWebsite@gmail.com</a> and we will delete the Movie or Tvshow that belong to
            </p>
        </div>
    )
}

export default WithPageContent(Dmca , true)
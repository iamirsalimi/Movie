import Home from './Pages/Home/Home'
import Movie from './Pages/Movie/Movie'
import MoviePage from './Pages/Movie/Movie'


let Routes = [
    {path : '/'  , element : <Home />},

    {path : '/*' , element : <Movie /> , children : [
        {path:'Movie/:movieId' , element:<MoviePage />},
        {path:'Series/:movieId' , element:<MoviePage />}
    ]}

]

export default Routes
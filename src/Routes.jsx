import Home from './Pages/Home/Home'
import Movie from './Pages/Movie/Movie'
// import MoviePage from './Pages/MoviePage/MoviePage'


let Routes = [
    {path : '/'  , element : <Home />},
    {path:'/:movieType/:movieId' , element:<Movie/>},
]

export default Routes
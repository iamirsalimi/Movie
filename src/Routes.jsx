import Home from './Pages/Home/Home'
import Movie from './Pages/Movie/Movie'
import Actors from './Pages/Actors/Actors'


let Routes = [
    {path : '/'  , element : <Home />},
    {path:'/:movieType/:movieId' , element:<Movie/>},
    {path:'/actors/:actorsId' , element:<Actors/>},
]

export default Routes
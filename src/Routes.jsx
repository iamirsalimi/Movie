import Home from './Pages/Home/Home'
import Movie from './Pages/Movie/Movie'
import Actors from './Pages/Actors/Actors'
import NotFound from './Pages/NotFound/NotFound'
import Dmca from './Pages/Dmca/Dmca'
import ImdbTop from './Pages/ImdbTop/ImdbTop'

let Routes = [
    {path : '/'  , element : <Home />},
    {path:'/page/:pageId' , element : <Home />},
    {path:'/:movieType/:movieId' , element:<Movie/>},
    {path:'/actors/:actorsId' , element:<Actors/>},
    {path:'/dmca' , element:<Dmca/>},
    {path:'/imdb-top/:movieType' , element : <ImdbTop/>},
    {path:'/imdb-top/:movieType/page/:pageId' , element : <ImdbTop/>},
    {path:'*' , element : <NotFound/>},
]

export default Routes
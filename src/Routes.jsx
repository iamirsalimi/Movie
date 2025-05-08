// layouts
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import PanelLayout from './Layouts/PanelLayout'

//pages
import Home from './Pages/Home/Home'
import Movie from './Pages/Movie/Movie'
import Actors from './Pages/Actors/Actors'
import NotFound from './Pages/NotFound/NotFound'
import Dmca from './Pages/Dmca/Dmca'
import ImdbTop from './Pages/ImdbTop/ImdbTop'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
// userPanel
import UserPanel from './Pages/UserPanel/UserPanel'
import Dashboard from './Pages/Dashboard/Dashboard'
import ProfileEdit from './Pages/ProfileEdit/ProfileEdit'
import VipPlan from './Pages/VipPlan/VipPlan'
import WatchList from './Pages/Watchlist/WatchList'
import Notifs from './Pages/Notifs/Notifs'
import Requests from './Pages/Requests/Requests'
import Comments from './Pages/Comments/Comments'
import Messages from './Pages/Messages/Messages'
import AllRequests from './Pages/AllRequests/AllRequests'
import AddRequest from './Pages/AddRequest/AddRequest'
import AllTickets from './Pages/AllTickets/AllTickets'
import AddNewTicket from './Pages/AddNewTicket/AddNewTicket'
import TicketDetails from './Pages/TicketDetails/TicketDetails'

// AdminPanel
import AdminPanel from './Pages/AdminPanel/AdminPanel'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import Movies from './Pages/Movies/Movies'
import AllMovies from './Pages/AllMovies/AllMovies'
import AddMovie from './Pages/AddMovie/AddMovie'
import Users from './Pages/Users/Users'
import AllUsers from './Pages/AllUsers/AllUsers'
import UserDetails from './Pages/UserDetails/UserDetails'
import EditUser from './Pages/EditUser/EditUser'

let Routes = [
    {
        element: <MainLayout />, children: [
            { path: '/', element: <Home /> },
            { path: '/page/:pageId', element: <Home /> },
            { path: '/:movieType/:movieId', element: <Movie /> },
            { path: '/actors/:actorsId', element: <Actors /> },
            { path: '/dmca', element: <Dmca /> },
            { path: '/imdb-top/:movieType', element: <ImdbTop /> },
            { path: '/imdb-top/:movieType/page/:pageId', element: <ImdbTop /> }
        ]
    },
    {
        path: '/account', element: <AuthLayout />, children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> }
        ]
    },
    {
        path: '/my-account', element: <PanelLayout />, children: [
            {
                path: 'userPanel', element: <UserPanel />, children: [
                    { index: true, element: <Dashboard /> },
                    { path: 'profile-edit', element: <ProfileEdit /> },
                    { path: 'vip-plan', element: <VipPlan /> },
                    { path: 'watchList', element: <WatchList /> },
                    { path: 'notifications', element: <Notifs /> },
                    { path: 'requests', element: <Requests /> , children : [
                        {index : true , element : <AllRequests /> },
                        {path : 'add-request' , element : <AddRequest /> }
                    ] },
                    { path: 'comments', element: <Comments /> },
                    { path: 'messages', element: <Messages /> , children : [
                        {index : true , element : <AllTickets /> },
                        {path : 'add-new-ticket' , element : <AddNewTicket /> },
                        {path : 'ticket-details/:ticketId' , element : <TicketDetails /> },
                    ]},
                ]
            },
            {
                path: 'adminPanel', element: <AdminPanel />, children: [
                    { index: true, element: <AdminDashboard /> },
                    { path: 'profile-edit', element: <ProfileEdit /> },
                    { path: 'movies', element: <Movies />  , children : [
                        { index : true , element: <AllMovies /> },
                        { path: 'add-movie', element: <AddMovie /> },
                        { path: 'edit-movie/:movieId', element: <AddMovie /> },
                    ]},
                    { path: 'users', element: <Users />  , children : [
                        { index : true , element: <AllUsers /> },
                        { path: 'user-details/:userId', element: <UserDetails /> },
                        { path: 'edit-user/:userId', element: <EditUser /> },
                    ]}
                ]
            },
        ]
    },
    { path: '*', element: <NotFound /> },
]

export default Routes
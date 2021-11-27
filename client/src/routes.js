import Admin from "./pages/Admin"
import Main from "./pages/Main"
import UserPage from "./pages/UserPage"
import Auth from "./pages/Auth"
import ReviewPage from "./pages/ReviewPage"
import CreateReview from "./components/modals/CreateReview"

export const authRoutes = [
  {
    path: '/admin',
    Component: <Admin />
  },
  {
    path: '/user_page',
    Component: <UserPage />
  },
  {
    path: '/user_page',
    Component: <CreateReview />
  }

]

export const publicRoutes = [
  {
    path: '/',
    Component: <Main />  },
  {
    path: '/registration',
    Component: <Auth />
  },
  {
    path: '/login',
    Component: <Auth />
  },
  {
    path: 'review' + '/:id',  // path: '/:id'
    Component: <ReviewPage />
  }
]
import { LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE, POST_ROUTE, ADMIN_ROUTE, CONFIRM_ROUTE, SELFEDIT_ROUTE } from "./utils/consts";
import Auth from "./pages/Auth";
import Posts from "./pages/Posts";
import PostPage from "./pages/PostPage";
import Admin from "./pages/Admin";
import SelfEdit from "./pages/SelfEdit";
import NewPost from "./pages/NewPost";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CONFIRM_ROUTE,
        Component: Auth
    },
    {
        path: POSTS_ROUTE,
        Component: Posts
    },
    {
        path: POST_ROUTE + '/:id',
        Component: PostPage
    }
]

export const privateRoutes = [
    {
        path: POSTS_ROUTE + '/new',
        Component: NewPost
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: SELFEDIT_ROUTE,
        Component: SelfEdit
    }
]

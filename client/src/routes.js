import { LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE, POST_ROUTE, ADMIN_ROUTE, CONFIRM_ROUTE, SELFEDIT_ROUTE, USER_ROUTE, USER_EDIT_ROUTE, FORGET_ROUTE, RESET_ROUTE, TAGS_ROUTE } from "./utils/consts";
import Auth from "./pages/Auth";
import Posts from "./pages/Posts";
import PostPage from "./pages/PostPage";
import SelfEdit from "./pages/SelfEdit";
import NewPost from "./pages/NewPost";
import UserPage from "./pages/UserPage";
import EditUser from "./pages/EditUser";
import Tags from "./pages/Tags";

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
        path: FORGET_ROUTE,
        Component: Auth
    },
    {
        path: RESET_ROUTE,
        Component: Auth
    },
    {
        path: POSTS_ROUTE,
        Component: Posts
    },
    {
        path: POST_ROUTE + '/:id',
        Component: PostPage
    },
    {
        path: USER_ROUTE + '/:id',
        Component: UserPage
    },
    {
        path: TAGS_ROUTE,
        Component: Tags
    }
]

export const privateRoutes = [
    {
        path: POSTS_ROUTE + '/new',
        Component: NewPost
    },
    {
        path: SELFEDIT_ROUTE,
        Component: SelfEdit
    },
    {
        path: USER_EDIT_ROUTE + '/:id',
        Component: EditUser
    }
]

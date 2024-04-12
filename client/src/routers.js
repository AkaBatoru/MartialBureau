import Admin from "./pages/Admin"
import ServicePage from "./pages/ServicePage"
import Order from "./pages/OrderPage"
import Auth from "./pages/Auth"
import Shop from "./pages/Shop"
import { ADMIN_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE, SERVICE_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRouters = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDER_ROUTE,
        Component: Order
    }
]

export const publicRouters = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: SERVICE_ROUTE + '/:ID_Service',
        Component: ServicePage
    }
]
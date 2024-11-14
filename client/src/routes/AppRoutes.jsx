import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../ui/AppLayout';
import ResultLayout from '../ui/ResultLayout'
import CartLayout from "../ui/CartLayout"
import ResultBook from '../features/book/ResultBook';


const Home = lazy(() => import('../pages/Home'))
const Account = lazy(() => import('../pages/Account'))
const Order = lazy(() => import('../pages/Order'))
const Wishlist = lazy(() => import('../pages/Wishlist'))
const Cart = lazy(() => import('../pages/Cart'))

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" index element={<Home />} />

            {/* Cart Section */}
            <Route path="/cart" element={<CartLayout />}>
                <Route index element={<Cart />} />
            </Route>

            {/* Account Section */}
            <Route path="/my-account" element={<AppLayout />}>
                <Route path='account' index element={<Account />} />
                <Route path="order" element={<Order />} />
                <Route path="wishlist" element={<Wishlist />} />
            </Route>

            {/* Result Section */}
            <Route path="/result" element={<ResultLayout />}>
                <Route path=':slug' element={<ResultBook />} />
            </Route>
        </Routes>

    )
}

export default AppRoutes;  
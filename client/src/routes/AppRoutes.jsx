import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../ui/AppLayout';
import ResultBook from '../features/book/ResultBook';

const Home = lazy(() => import('../pages/Home'))
const Account = lazy(() => import('../pages/Account'))
const Order = lazy(() => import('../pages/Order'))
const Wishlist = lazy(() => import('../pages/Wishlist'))

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" index element={<Home />} />
            <Route path="/my-account" element={<AppLayout />}>
                <Route path='account' index element={<Account />} />
                <Route path="order" element={<Order />} />
                <Route path="wishlist" element={<Wishlist />} />
            </Route>
            <Route path="/result" element={<AppLayout />}>
                <Route path=':slug' element={<ResultBook />} />
            </Route>
        </Routes>

    )
}

export default AppRoutes;  
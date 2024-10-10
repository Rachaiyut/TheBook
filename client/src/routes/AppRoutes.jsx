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
            <Route path="/home" element={<Home />} />
            <Route path="/my-account" element={<AppLayout />}>
                <Route index path="/my-account" element={<Account />} />
                <Route index path="/my-account/order" element={<Order />} />
                <Route index path="/my-account/wishlist" element={<Wishlist />} />
            </Route>
            <Route path="/result" element={<AppLayout />}>
                <Route index path='/result/:slug' element={<ResultBook />} />
            </Route>
        </Routes >
    )
}

export default AppRoutes;  
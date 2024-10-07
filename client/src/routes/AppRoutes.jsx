import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../ui/AppLayout';

const Home = lazy(() => import('../pages/Home'))
const Account = lazy(() => import('../pages/Account'))
const Order = lazy(() => import('../pages/Order'))
const Wishlist = lazy(() => import('../pages/Wishlist'))

function AppRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/my-account" element={<AppLayout />}>
                <Route index path="/my-account" element={<Account />} />
                <Route index path="/my-account/order" element={<Order />} />
                <Route index path="/my-account/wishlist" element={<Wishlist />} />
            </Route>
            <Route path="/:test" element={<AppLayout />}>
                <Route></Route>
            </Route>
        </Routes >
    )
}

export default AppRoutes;  
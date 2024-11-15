import { Outlet } from "react-router-dom"

import withAuthGuard from "../hoc/withAuthGuard"

import Footer from "./Footer"
import Navbar from "./Navbar"

function CartLayout() {

    return (
        <>
            <Navbar />
            <main className="bg-moonLily">
                <section className="max-w-[1340px] mx-auto flex px-4 md:px-10 p-6">
                    <Outlet />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default withAuthGuard(CartLayout)   
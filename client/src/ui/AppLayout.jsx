import { Outlet } from "react-router-dom"

import withAuthGuard from "../hoc/withAuthGuard"

import Footer from "./Footer"
import Navbar from "./Navbar"
import SideBar from "./Sidebar"

function AppLayout() {

    return (
        <>
            <Navbar />
            <div className=""></div>
            <main className="bg-moonLily">
                <section className="max-w-[1340px] mx-auto flex px-4 md:px-10 p-6">
                    <SideBar />
                    <Outlet />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default withAuthGuard(AppLayout)   
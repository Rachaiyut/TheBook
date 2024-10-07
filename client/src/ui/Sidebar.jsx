function SideBar() {
    return (
        <aside id="sidebar" className="max-w-[250px] w-full flex flex-col gap-3 px-8 py-4 text-left border bg-white ">
            <section id="widget_1" className="py-2">
                Accout Detail
            </section>
            <div className="border-t border-gray-300 my-1"></div>
            <section id="widget_2" className="py-2">
                Address
            </section>
            <div className="border-t border-gray-300 my-1"></div>
            <section id="widget_3" className="py-2">
                Orders
            </section>
            <div className="border-t border-gray-300 my-1"></div>
            <section id="widget_4" className="py-4">
                Wishlist
            </section>
        </aside>
    )
}

export default SideBar;
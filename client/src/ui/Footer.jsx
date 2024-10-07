import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
    IoIosCall,
    IoMdMail,
    IoIosTime
} from "react-icons/io";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa6";


function Footer() {
    return (
        <footer className="bg-moonLilly">
            <div className='max-w-[1440px] mx-auto mt-6 pb-8 px-8'>
                {/* main 1 */}
                <div className="grid grid-cols-3 justify-center items-center p-8">
                    {/* item 1 */}
                    <div className="flex gap-5">
                        <div className="p-4 border-2 rounded-lg">
                            <IoIosCall />
                        </div>
                        <div className="flex flex-auto flex-col">
                            <p className="text-8md">
                                <strong>
                                    084-1983639
                                </strong>
                            </p>
                            <p>Free support line</p>
                        </div>
                    </div>
                    {/* item 2 */}
                    <div className="flex gap-5">
                        <div className="p-4 border-2 rounded-lg">
                            <IoMdMail />
                        </div>
                        <div className="flex flex-auto flex-col">
                            <p className="text-8md">
                                <strong>
                                    book@smithproject.co.th
                                </strong>
                            </p>
                            <p>Order support line</p>
                        </div>
                    </div>
                    {/* item 3 */}
                    <div className="flex gap-5">
                        <div className="p-4 border-2 rounded-lg">
                            <IoIosTime />
                        </div>
                        <div className="flex flex-auto flex-col">
                            <p className="text-8md">
                                <strong>
                                    Mon-Fri / 8:00 - 18:00
                                </strong>
                            </p>
                            <p>Working Days/Hours</p>
                        </div>
                    </div>
                </div>

                <hr />

                {/* main 2 */}
                <div className="grid grid-cols-4 p-8">
                    {/* item 1 */}
                    <div className="flex flex-auto flex-col gap-1">
                        <h3 className="uppercase font-bold mb-3">
                            Online orders enquiry
                        </h3>
                        <div className="flex flex-col gap-2">
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>Privacy Policy</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>Shipping Policy</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>Contact Us</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>About us</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>How to order</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>How to pay</a>
                            </p>
                        </div>
                    </div>
                    {/* item 2 */}
                    <div className="flex flex-auto flex-col gap-1">
                        <h3 className="uppercase font-bold mb-3">
                            Customer service
                        </h3>
                        <div className="flex flex-col gap-2">
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>Order History</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>My Account</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>My Whistlist</a>
                            </p>
                        </div>
                    </div>
                    {/* item 3 */}
                    <div className="flex flex-auto flex-col gap-1">
                        <h3 className="uppercase font-bold mb-3">
                            Store Infomation
                        </h3>
                        <div className="flex flex-col gap-2">
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>Contact Us</a>
                            </p>
                            <p className="flex items-center gap-2">
                                <MdOutlineKeyboardArrowRight />
                                <a>Find a store</a>
                            </p>
                        </div>
                    </div>
                    {/* item 4 */}
                    <div className="flex flex-auto flex-col gap-1">
                        <h3 className="uppercase font-bold mb-3">
                            Store Infomation
                        </h3>
                        <div className="flex gap-3">
                            <FaFacebook className="text-xl" />
                            <FaInstagram className="text-xl" />
                            <FaTwitter className="text-xl" />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="pt-8 px-8">
                    Copyright 2024 <strong><a className="text-orange-200">TheBooks</a></strong> All rights reserved
                </div>
            </div>
        </footer>
    )
}

export default Footer;
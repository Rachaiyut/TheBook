function Account() {
    return (
        <div className="w-full">
            <form className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded">
                {/* Personal Information Section */}
                <h2 className="text-lg font-bold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-700 mb-1">Title</label>
                        <select className="w-full p-2 border border-gray-300 rounded">
                            <option>Miss</option>
                        </select>
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="block text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Rachaiyut"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-gray-700 mb-1">Gender</label>
                        <select className="w-full p-2 border border-gray-300 rounded">
                            <option>Men</option>
                        </select>
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Hayibilang"
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="charuj44@yahoo.com"
                        />
                    </div>

                    {/* Mobile Phone */}
                    <div>
                        <label className="block text-gray-700 mb-1">Mobile Phone</label>
                        <input
                            type="tel"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder=""
                        />
                    </div>

                    {/* Telephone */}
                    <div>
                        <label className="block text-gray-700 mb-1">Telephone</label>
                        <input
                            type="tel"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder=""
                        />
                    </div>

                    {/* Birth Date */}
                    <div>
                        <label className="block text-gray-700 mb-1">Birth Date</label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder=""
                        />
                    </div>

                    {/* ID Card */}
                    <div>
                        <label className="block text-gray-700 mb-1">ID Card</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder=""
                        />
                    </div>

                    {/* Nationality */}
                    <div>
                        <label className="block text-gray-700 mb-1">Nationality</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder=""
                        />
                    </div>
                </div>

                {/* Save Changes Button */}
                <button className="mt-6 bg-gray-700 text-white py-2 px-4 rounded">
                    Save Changes
                </button>

                {/* Password Change Section */}
                <h2 className="text-lg font-bold mt-8 mb-4">Password Change</h2>
                <div className="grid grid-cols-1 gap-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Current Password (if Facebook account, Enter 1)
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder=""
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            New Password (leave blank to leave unchanged)
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder=""
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder=""
                        />
                    </div>
                </div>

                {/* Save Changes Button */}
                <button className="mt-6 bg-gray-700 text-white py-2 px-4 rounded">
                    Save Changes
                </button>
            </form>
        </div>
    )
}

export default Account;
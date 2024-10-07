import { useOptionalForm } from "../../contexts/OptionalFormContext";

function SignUp() {

    const { showLoginForm } = useOptionalForm();

    return (
        <>
            <section className='p-12'>
                <h1 className='text-3xl text-center font-bold p-6 mb-4'>Sign Up</h1>
                <div className='flex flex-col items-start gap-4'>
                    <form
                        className="w-full"
                    // onSubmit={handleSubmitLogin}
                    >
                        <div className="mb-2">
                            <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 uppercase mb-2">Email:</label>
                            <input
                                type="email"
                                id="user-email"
                                name="email"
                                // value={data.email}
                                placeholder="example@yahoo.com"
                                className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                            // onChange={handleChange}
                            />
                            <div id="user-email" className="sr-only">
                                Please enter a valid username. It must contain at least 6 characters.
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 uppercase mb-2">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                // value={data.password}
                                className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            // onChange={handleChange}
                            />
                            <div id="user-password" className="sr-only">
                                Your password should be more than 6 characters.
                            </div>
                        </div>
                        <button
                            className="w-full py-3 bg-gray-500  text-white font-semibold rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
            <div className='px-4 sm:px-8 text-xs sm:text-sm text-center mb-4'>
                By continuing, you agree to Books Terms of Service and confirm that you have read Books Privacy Policy.
            </div>
            <div className='flex justify-center items-center py-full sm:py-6 text-sm'>
                Don’t have an account?
                <button
                    className='text-blue-500 ml-1'
                    onClick={() => showLoginForm()}
                >
                    Login
                </button>
            </div>
        </>
    )
}

export default SignUp;
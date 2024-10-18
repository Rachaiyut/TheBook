import PropTypes from 'prop-types';

// React Roueter Dom
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "./redux/authSlice";

// React Hook Form
import { useForm } from "react-hook-form";

// Context
import { useOptionalForm } from "../../contexts/OptionalFormContext";

// UI
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import Loader from "../../ui/Loader";

function LoginForm({ handleHide }) {
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const { register, handleSubmit, reset } = useForm()
    const { showSignUpForm } = useOptionalForm();

    const navigate = useNavigate()

    const submitForm = async (data) => {
        const resultAction = await dispatch(loginRedux(data));
        reset();
        handleHide();

        if (loginRedux.fulfilled.match(resultAction)) {
            navigate('/my-account/account');
        }
    }

    if (loading) return <Loader />

    return (
        <>
            <section className='pt-12 px-12 pb-5'>
                <h1 className='text-3xl text-center font-bold p-6 mb-4'>Login</h1>
                <div className='flex flex-col items-start gap-4'>
                    <form
                        className="w-full"
                        onSubmit={handleSubmit(submitForm)}
                    >
                        <div className="mb-2">
                            <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 uppercase mb-2">Email:</label>
                            <input
                                className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                                type="email"
                                id="user-email"
                                name="email"
                                {...register('email')}
                                placeholder="example@yahoo.com"
                            />
                            <div id="user-email" className="sr-only">
                                Please enter a valid username. It must contain at least 6 characters.
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 uppercase mb-2">Password:</label>
                            <input
                                className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                type="password"
                                id="password"
                                name="password"
                                {...register('password')}
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
            </section >


            <section>
                <div className='relative flex justify-center items-center mt-2'>
                    <span className='absolute inset-x-12 border-t border-gray-300' style={{ top: '50%' }}></span>
                    <span className='bg-[#f1f1f1] px-2 text-xs sm:text-sm text-center relative z-10'>or</span>
                </div>

                <div className="flex justify-center gap-6 mt-6 ">
                    <div className="px-4 py-3 rounded-md bg-red-400 text-white flex items-center justify-center shadow-md hover:bg-red-500 transition duration-150">
                        <Link to={"http://localhost:8000/api/v1/auth/login/google"}>
                            <FaGoogle className="text-lg" />
                        </Link>
                    </div>
                    <div className="px-4 py-3 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition duration-150">
                        <Link>
                            <FaFacebookF className="text-lg" />
                        </Link>
                    </div>
                </div>

                <div className='flex justify-center items-center py-full sm:py-6 text-sm'>
                    Don’t have an Account ?
                    <button
                        className='text-blue-500 ml-1'
                        onClick={() => showSignUpForm()}
                    >
                        Sign up
                    </button>
                </div>
            </section>

        </>
    )
}

LoginForm.propTypes = {
    handleHide: PropTypes.func.isRequired
};


export default LoginForm
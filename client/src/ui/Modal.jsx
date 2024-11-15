// React
import { forwardRef, useImperativeHandle, useRef } from 'react';

// Context
import { useOptionalForm } from '../contexts/OptionalFormContext';

// Icons
import { IoMdCloseCircleOutline } from "react-icons/io";

// UI
import FormLogin from '../features/authenticate/LoginForm';
import FormSignUp from '../features/authenticate/SignupForm';


const Modal = forwardRef(function Modal(props, ref) {
    const { isLoginFormVisible, isSignUpFormVisible } = useOptionalForm();
    const modal = useRef(null);

    useImperativeHandle(ref, () => ({
        show() {
            modal.current.showModal();
            document.body.style.overflow = 'hidden';  
        },
    }), []);


    function handleHide() {
        modal.current.close();
        document.body.style.overflow = 'auto';
    }

    return (
        <dialog
            ref={modal}
            className='container max-w-[443px] min-h-[513px] bg-[#f1f1f1] rounded-md shadow-lg overflow-hidden'
        >

            {isLoginFormVisible && <FormLogin handleHide={handleHide} />}

            {isSignUpFormVisible && <FormSignUp handleHide={handleHide} />}

            <div className='absolute top-4 right-4'>
                <button onClick={handleHide}>
                    <IoMdCloseCircleOutline className='text-3xl' />
                </button>
            </div>
        </dialog>
    );
});

export default Modal
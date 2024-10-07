import { createContext, useContext, useReducer } from "react";

const OptionalFormContext = createContext();

const initialState = {
    isLoginFormVisible: true,
    isSignUpFormVisible: false,
};

function formReducer(state, action) {
    switch (action.type) {
        case "SHOW_LOGIN_FORM":
            return {
                ...state,
                isLoginFormVisible: action.payload,
                isSignUpFormVisible: !action.payload,
            };
        case "SHOW_SIGNUP_FORM":
            return {
                ...state,
                isLoginFormVisible: !action.payload,
                isSignUpFormVisible: action.payload,
            };
        default:
            throw new Error("Unknown action type");
    }
}

function OptionalFormProvider({ children }) {
    const [{ isLoginFormVisible, isSignUpFormVisible }, dispatch] = useReducer(formReducer, initialState);

    const showLoginForm = () => {
        dispatch({ type: "SHOW_LOGIN_FORM", payload: true });
    };

    const showSignUpForm = () => {
        dispatch({ type: "SHOW_SIGNUP_FORM", payload: true });
    };


    return (
        <OptionalFormContext.Provider
            value={{
                isLoginFormVisible,
                isSignUpFormVisible,
                showLoginForm,
                showSignUpForm,
            }}
        >
            {children}
        </OptionalFormContext.Provider>
    );
}

function useOptionalForm() {
    const context = useContext(OptionalFormContext);
    if (!context) {
        throw new Error("useOptionalForm must be used within an OptionalFormProvider");
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { OptionalFormProvider, useOptionalForm };

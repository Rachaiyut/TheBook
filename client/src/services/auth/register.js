import axios from 'axios'

const backendURL = 'http://127.0.0.1:8000'

const registerUser = async ({ name, email, password }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const user = await axios.post(
        `${backendURL}/api/v1/auth/signup`,
        { name, email, password },
        config
    )

    console.log(user)

    return user;
}

export default registerUser;
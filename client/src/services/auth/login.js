import axios from 'axios'

const backendURL = 'http://127.0.0.1:8000'

const loginUser = async ({ email, password }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const user = await axios.post(
        `${backendURL}/api/v1/auth/login`,
        { email, password },
        config
    )

    return user;
}

export default loginUser;
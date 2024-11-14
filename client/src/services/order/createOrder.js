import axios from 'axios'

const backendURL = 'http://127.0.0.1:8000'

const createOrder = async ({ userId, status, totalAmount, orderItems }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const order = await axios.post(
        `${backendURL}/api/v1/auth/order`,
        { userId, status, totalAmount, orderItems },
        config
    )

    return order;
}

export default createOrder;
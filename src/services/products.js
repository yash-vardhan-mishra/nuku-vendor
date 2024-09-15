import { baseUrl } from "../constants";
import { commonErrorHandler } from "../utils";

export const fetchProducts = async () => {
    try {
        const token = localStorage.getItem('token');
        const url = `${baseUrl}/vendor/fetchitems`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const database = await response.json();
        return database
    } catch (error) {
        throw error
    }
}

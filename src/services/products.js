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

export const addItemToInventory = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const url = `${baseUrl}/vendor/additem`;
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: token,
            }
        });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateItemInInventory = async (body) => {
    try {
        const token = localStorage.getItem('token');
        const url = `${baseUrl}/vendor/updateitem`;
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteItemFromInventory = async (productId) => {
    try {
        const token = localStorage.getItem('token');
        const url = `${baseUrl}/vendor/deleteitem?productId=${productId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
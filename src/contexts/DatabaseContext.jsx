import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { addItemToInventory, fetchProducts } from "../services/products";
import Loading from "../components/Utilities/Loading";
import { checkForErrorType } from "../utils";
import { toast } from 'react-toastify';

const DatabaseContext = createContext();

export const useDatabase = () => {
    return useContext(DatabaseContext);
};

export const DatabaseProvider = ({ children }) => {
    const { authenticated, logout } = useContext(AuthContext);
    const [data, setData] = useState();
    const [selectedProductId, setSelectedProductId] = useState(null)

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true)
        fetchProducts().then(res => {
            setData(res)
        }).catch(err => {
            showError(err)
        }).finally(() => {
            setLoading(false)
        })

    };

    const showError = (error) => {
        const errorMessage = error.message || 'Something went wrong';
        const colonIndex = errorMessage.indexOf(':');
        const finalMessage = colonIndex !== -1 ? errorMessage.slice(colonIndex + 1).trim() : errorMessage;
        toast.error(finalMessage);
    };

    const addProduct = (formData) => {
        setLoading(true)
        addItemToInventory(formData).then(res => {
            fetchData()
        }).catch(err => {
            const shouldDeleteToken = checkForErrorType(err);
            if (shouldDeleteToken) {
                logout()
                navigate(`/login`);
            }
        })
    }

    useEffect(() => {
        if (authenticated) {
            fetchData()
        }
    }, [authenticated])


    if (loading) {
        return <Loading />;
    }

    return (
        <DatabaseContext.Provider
            value={{ data, selectedProductId, setSelectedProductId, fetchData, addProduct }}
        >
            {children}
        </DatabaseContext.Provider>
    );
};

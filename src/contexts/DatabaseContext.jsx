import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { addItemToInventory, fetchProducts } from "../services/products";
import Loading from "../components/Utilities/Loading";
import { checkForErrorType } from "../utils";

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
            alert(err.message || 'Something went wrong')
        }).finally(() => {
            setLoading(false)
        })

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

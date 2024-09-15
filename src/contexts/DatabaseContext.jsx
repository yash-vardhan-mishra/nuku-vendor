import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { fetchProducts } from "../services/products";
import Loading from "../components/Utilities/Loading";

const DatabaseContext = createContext();

export const useDatabase = () => {
    return useContext(DatabaseContext);
};

export const DatabaseProvider = ({ children }) => {
    const { authenticated } = useContext(AuthContext);
    const [data, setData] = useState();
    const [selectedProductId, setSelectedProductId] = useState(null)

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (authenticated) {
            setLoading(true)
            fetchProducts().then(res => {
                console.log('fetchProducts ,',res);
                setData(res)
            }).catch(err => {
                alert(err.message || 'Something went wrong')
            }).finally(() => {
                setLoading(false)
            })
        }
    };

    useEffect(() => {
        fetchData()
    }, [])


    if (loading) {
        return <Loading />;
    }

    return (
        <DatabaseContext.Provider
            value={{ data, selectedProductId, setSelectedProductId }}
        >
            {children}
        </DatabaseContext.Provider>
    );
};

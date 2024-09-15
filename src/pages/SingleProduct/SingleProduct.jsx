import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Layout from "../../Layout";
import Loading from "../../components/Utilities/Loading";
import { AuthContext } from "../../contexts/AuthContext";
import Modal from "../../components/Modal";
import { deleteItemFromInventory, updateItemInInventory } from "../../services/products";
import { useDatabase } from "../../contexts/DatabaseContext";
import { checkForErrorType } from "../../utils";

const SingleProduct = () => {
    const [loading, setLoading] = useState(false);
    const { logout } = useContext(AuthContext);
    const { fetchData } = useDatabase()
    const navigate = useNavigate();
    const location = useLocation();
    const { product } = location.state || {};
    const [isModalVisible, setIsModalVisible] = useState(false);

    const updateItem = (newItem) => {
        setLoading(true)
        updateItemInInventory({
            "productId": product.id,
            "updateData": {
                "category": newItem.category,
                "description": newItem.description,
                "price": newItem.price,
                "stock_quantity": newItem.stock_quantity,
            }
        }).then(res => {
            navigate('/dashboard');
            fetchData()
        }).catch(err => {
            const shouldDeleteToken = checkForErrorType(err);
            if (shouldDeleteToken) {
                logout()
                navigate(`/login`);
            }
        })
    };

    const deleteItem = () => {
        setLoading(true)
        deleteItemFromInventory(product.id).then(res => {
            navigate('/dashboard');
            fetchData()
        }).catch(err => {
            const shouldDeleteToken = checkForErrorType(err);
            if (shouldDeleteToken) {
                logout()
                navigate(`/login`);
            }
        })

    }

    if (loading) {
        return <Loading />;
    }

    if (product?.image_url) {
        const { name, image_url, description, category, price, stock_quantity } = product;

        return (
            <Layout>
                <div className="container mx-auto py-8">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="-mx-4 flex flex-col md:flex-row">
                            <div className="px-4 md:flex-1">
                                <div className="mb-4 rounded-lg bg-gray-100 p-10">
                                    <img
                                        className="mx-auto h-full w-10/12 object-cover mix-blend-multiply"
                                        src={image_url}
                                        alt={name}
                                    />
                                </div>
                            </div>
                            <div className="p-10 px-4 md:flex-1">
                                <p className="mb-4 text-sm font-bold uppercase text-blue-400">
                                    {category}
                                </p>
                                <h2 className="mb-3 text-4xl font-bold leading-9 text-gray-800">
                                    {name}
                                </h2>
                                <p className="my-3 border-b border-t py-4 text-3xl leading-10">
                                    ${price}
                                </p>
                                <p className="my-6 text-gray-600">{description}</p>

                                <div className="mb-4 flex flex-col gap-6">
                                    <form className="flex items-center gap-10">
                                        <p className="mb-2 block font-medium text-gray-900">
                                            Quantity:
                                        </p>
                                        <div className="relative flex max-w-[8rem] items-center">
                                            <div
                                                id="quantity-display"
                                                className="block h-12 w-full py-2.5 text-center text-sm text-gray-900"
                                            >
                                                {stock_quantity}
                                            </div>
                                        </div>
                                    </form>

                                    <div className="flex gap-4">
                                        <button
                                            className="flex w-1/2 items-center justify-center gap-3 rounded bg-sky-500 px-4 py-3 text-white transition duration-300 hover:bg-sky-600"
                                            onClick={() => setIsModalVisible(true)} // Open modal
                                        >
                                            <BsPencilSquare />
                                            <span>Edit Details</span>
                                        </button>

                                        <button
                                            onClick={() => deleteItem()}
                                            className="flex w-1/2 items-center justify-center gap-3 rounded bg-red-500 px-4 py-3 text-white transition duration-300 hover:bg-red-600"
                                        >
                                            <BsTrash />
                                            <span>Delete Item</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    product={product}
                    isUpdating
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    updateItem={updateItem}
                />
            </Layout>
        );
    }

    return null;
};

export default SingleProduct;

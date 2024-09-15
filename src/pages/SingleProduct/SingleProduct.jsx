import React, { useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import Layout from "../../Layout";
import Loading from "../../components/Utilities/Loading";
import { AuthContext } from "../../contexts/AuthContext";

const SingleProduct = () => {
    const [loading, setLoading] = useState(false);
    const { authenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const { product } = location.state || {};
    console.log('product is', product);


    // useEffect(() => {
    //     if (!loading) {
    //         setLoading(true)
    //     }
    //     const getSingleProduct = async (id) => {
    //         fetchSingleProduct(id)
    //             .then(res => {
    //                 setSingleProduct(res);
    //             })
    //             .catch(err => {
    //                 alert(err.message || 'Something went wrong')
    //             }).finally(() => {
    //                 setLoading(false)
    //             })
    //     };

    //     getSingleProduct(id);
    // }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (product?.image_url) {
        const { title, image_url, description, category, price, stock_quantity } = product;

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
                                        alt={title}
                                    />
                                </div>
                            </div>
                            <div className="p-10 px-4 md:flex-1">
                                <p className="mb-4 text-sm font-bold uppercase text-blue-400">
                                    {category}
                                </p>
                                <h2 className="mb-3 text-4xl font-bold leading-9 text-gray-800">
                                    {title}
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

                                    <button
                                        className="flex items-center justify-center gap-3 rounded bg-sky-500 px-8 py-3 text-white transition duration-300 hover:bg-sky-600"
                                        // onClick={addItemsToCart}
                                    >
                                        <BsCart2 />
                                        <span>Edit Details</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
};

export default SingleProduct;

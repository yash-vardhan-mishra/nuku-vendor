import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const Modal = ({ isModalVisible, setIsModalVisible, addItem, isUpdating, product = {}, updateItem }) => {
    const [inventoryData, setInventoryData] = useState({
        category: product.category || "",
        description: product.description || "",
        name: product.name || "",
        price: product.price || "",
        stock_quantity: product.stock_quantity || "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInventoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        setInventoryData((prevData) => ({
            ...prevData,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdating) {
            updateItem(inventoryData)
        } else {
            addItem(inventoryData)
        }
        setIsModalVisible(false);
    };

    return (
        <ReactModal
            isOpen={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
            contentLabel="Add/Edit Inventory Modal"
            className="relative bg-white rounded-lg p-8 w-full max-w-lg mx-auto mt-20 max-h-[85vh] overflow-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <h2 className="text-lg font-bold mb-4">{isUpdating ? 'Edit' : 'Add'} Inventory</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={inventoryData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        value={inventoryData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={inventoryData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={inventoryData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Stock Quantity</label>
                    <input
                        type="number"
                        name="stock_quantity"
                        value={inventoryData.stock_quantity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                {!isUpdating ? <div className="mb-4">
                    <label className="block mb-2">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full"
                    />
                </div> : null}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => setIsModalVisible(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 px-4 py-2 text-white rounded"
                    >
                        {isUpdating ? 'Edit Item' : 'Add Item'}
                    </button>
                </div>
            </form>
        </ReactModal>
    );
};

export default Modal;

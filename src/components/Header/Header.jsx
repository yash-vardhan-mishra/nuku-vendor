import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainMenu from "./MainMenu";
import { AuthContext } from "../../contexts/AuthContext";
import Modal from "./Modal";
import { useDatabase } from "../../contexts/DatabaseContext";
import { checkForErrorType } from "../../utils";

const Header = () => {
    const navigate = useNavigate();
    const { addProduct } = useDatabase()
    const location = useLocation();
    const { authenticated, logout } = useContext(AuthContext);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const signInAction = () => {
        if (authenticated) {
            logout();
        } else {
            navigate(`/login`);
        }
    };

    const Navigation = [
        {
            id: 1,
            menu: authenticated ? "Log Out" : "Sign In",
            icon: authenticated ? <FaSignOutAlt /> : <FaRegUser />,
            action: signInAction,
        },
    ];

    const isLoginPage = location.pathname === "/login";
    if (isLoginPage) {
        return null;
    }

    const addItem = (obj) => {
        const formData = new FormData();
        formData.append("category", obj.category);
        formData.append("description", obj.description);
        formData.append("name", obj.name);
        formData.append("price", obj.price);
        formData.append("stock_quantity", obj.stock_quantity);
        if (obj?.image) {
            formData.append("image", obj.image, obj.image.name);
        }
        addProduct(formData)
    }

    return (
        <>
            <header className="relative">
                <div className="bg-primary px-4 py-3 xl:py-4 2xl:px-16">
                    <div className="container mx-auto">
                        {/* Desktop Header */}
                        <div className="hidden md:flex justify-end">
                            <MainMenu
                                MenuArray={Navigation}
                                label={true}
                                setSlideInCart={setIsModalVisible}
                                slideInCart={isModalVisible}
                            />
                        </div>
                        {/* Mobile Header */}
                        <div className="md:hidden flex justify-end">
                            <MainMenu
                                MenuArray={Navigation}
                                label={false}
                                setSlideInCart={setIsModalVisible}
                                slideInCart={isModalVisible}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <Modal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} addItem={addItem} />
        </>
    );
};

export default Header;

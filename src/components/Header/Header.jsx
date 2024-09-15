import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainMenu from "./MainMenu";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authenticated, logout } = useContext(AuthContext)

    const signInAction = () => {
        if (authenticated) {
            logout()
        } else {
            navigate(`/login`);
        }
    }

    const Navigation = [
        {
            id: 1,
            menu: authenticated ? "Log Out" : "Sign In",
            icon: authenticated ? <FaSignOutAlt /> : <FaRegUser />,
            action: signInAction

        },
    ];

    // hide the header in case of login screen
    const isLoginPage = location.pathname === "/login";
    if (isLoginPage) {
        return null;
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
                            />
                        </div>
                        {/* Mobile Header */}
                        <div className="md:hidden flex justify-end">
                            <MainMenu
                                MenuArray={Navigation}
                                label={false}
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;

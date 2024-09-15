import React from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";

const MainMenu = ({
    MenuArray,
    label,
    slideInCart,
    setSlideInCart,
}) => {
    return (
        <ul className="flex gap-x-5 text-white">
            {MenuArray.map((item) => (
                <li key={item.id}>
                    <a
                        onClick={item?.action ? item.action : null}
                        className="flex flex-col items-center gap-1 cursor-pointer hover:text-yellow-500"
                    >
                        {item.icon}
                        {label && <span className="text-sm">{item.menu}</span>}
                    </a>
                </li>
            ))}
            <li>
                <button
                    onClick={() => {
                        setSlideInCart(!slideInCart);
                    }}
                    className="relative flex flex-col items-center gap-1 cursor-pointer hover:text-yellow-500"
                >
                    <MdOutlineLibraryAdd />
                    {label && <span className="text-sm">Add Inventory</span>}
                </button>
            </li>
        </ul>
    );
};

export default MainMenu;

import React from "react";
import { BsPencilSquare } from "react-icons/bs";

const IconBtn = ({
    text, 
    onclick,
    children, 
    disabled, 
    outline=false,
    customClasses,
    type,
}) => {
    return (
        <button
            className={`flex items-center ${outline ? "border border-[#FFD60A] bg-transparent" : "bg-[#FFD60A]" } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] ${customClasses}`}
            disabled={disabled}
            onClick={onclick}
            type={type}
            
        >
            {
                children ? (
                    <>
                        <span className={`${outline && "text-[#FFD60A]"}`}>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }
            <>
            {
                text === "Edit" && <BsPencilSquare />
            }
            </>
        </button>
    )
}

export default IconBtn
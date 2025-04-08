import React from "react";
import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname);
    }
    
    return (
        <NavLink 
            to={link.path}
            className={`relative px-8 py-2 text-sm font-medium  
                        ${matchRoute(link.path) ? "bg-[#3D2A01] text-[#FFD60A]" : "bg-opacity-0 text-[#838894]"} transition-all duration-200 active`}
        >
            <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-[#FFD60A] 
                            ${matchRoute(link.path) ? "opacity-100": "opacity-0"}`}>
            </span>

            <div className="flex items-center gap-x-2">
                <Icon className="text-lg"/>
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLink

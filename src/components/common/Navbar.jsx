
import React, { useEffect } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import MobileProfileDropDown from '../core/Auth/MobileProfileDropDown'

import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

// const subLinks = [
//     {
//         title: "python",
//         link:"/catalog/python"
//     },
//     {
//         title: "web dev",
//         link:"/catalog/web-development"
//     },
// ]

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    const fetchSublinks = async () => {
      setLoading(true);
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        console.log("Printing Sublinks result: ", result);
        setSubLinks(result.data.data);
      } catch (error) {
        console.log("Could not fetch the category list");
      }
      setLoading(true);
    };
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-[#2C333F] ${
        location.pathname !== "/" ? "bg-[#161D29]" : ""
      } transition-all duration-200`}
    >
      <div className="w-11/12 max-w-[1260px] flex justify-between items-center">
        {/* Image */}
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy" />
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-[#DBDDEA] ">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-[#FFE83D]"
                        : "text-[#DBDDEA]"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />

                    <div
                      className="invisible absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[3rem] z-[1000]
                                    flex flex-col rounded-md bg-[#F1F2FF] p-4 text-[#000814] opacity-0 transition-all duration-200 
                                    group-hover:visible group-hover:opacity-100 group-hover:translate-y-[1.65em] lg:w-[300px]"
                    >
                      <div
                        className="absolute left-[50%] translate-x-[80%] top-0 translate-y-[-40%]
                                     h-6 w-6 rotate-45 rounded bg-[#F1F2FF] "
                      ></div>

                      {subLinks.length ? (
                        subLinks.map((subLink, index) => {
                          console.log("Rendering subLink:", subLink);
                          return (
                            <Link
                              to={`catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={index}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          );
                        })
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    {/* //link?.path uses optional chaining.
                                //If link is null or undefined, link?.path evaluates to undefined, and the to prop will receive undefined.
                                //If link is an object, link?.path accesses the path property of the link object. */}
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-[#FFE83D]"
                          : "text-[#DBDDEA]"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-[#AFB2BF]" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-[#424854] text-center text-xs font-bold text-[#E7C009]">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button
                className="border border-[#2C333F] bg-[#161D29] px-[12px] py-[8px]
                        text-[#AFB2BF] rounded-md"
              >
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button
                className="border border-[#2C333F] bg-[#161D29] px-[12px] py-[8px]
                        text-[#AFB2BF] rounded-md"
              >
                Sign Up
              </button>
            </Link>
          )}

          {/* for large devices */}
          {token !== null && <ProfileDropDown />}

          {/* for small devices */}
          {token !== null && <MobileProfileDropDown />}
        </div>
        {/* <button className="mr-4 md:hidden">
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button> */}
      </div>
    </div>
  );
};

export default Navbar;

















// import React, { useState, useEffect } from 'react'
// import { Link, matchPath, useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// import { NavbarLinks } from "../../data/navbar-links"
// import studyNotionLogo from '../../assets/Logo/Logo-Full-Light.png'
// import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';

// import ProfileDropDown from '../core/Auth/ProfileDropDown'
// import MobileProfileDropDown from '../core/Auth/MobileProfileDropDown'

// import { AiOutlineShoppingCart } from "react-icons/ai"
// import { MdKeyboardArrowDown } from "react-icons/md"

// const Navbar = () => {

//     const { token } = useSelector((state) => state.auth);
//     const { user } = useSelector((state) => state.profile);
//     // console.log('USER data from Navbar (store) = ', user)
//     const { totalItems } = useSelector((state) => state.cart)
//     const location = useLocation();

//     const [subLinks, setSubLinks] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const fetchSublinks = async () => {
//         try {
//             setLoading(true)
//             const res = await fetchCourseCategories();

//             setSubLinks(res);
//         }
//         catch (error) {
//             console.log("Could not fetch the category list = ", error);
//         }
//         setLoading(false)
//     }

//     useEffect(() => {
//         fetchSublinks();
//     }, [])

//     // when user click Navbar link then it will hold yellow color
//     const matchRoute = (route) => {
//         return matchPath({ path: route }, location.pathname);
//     }

//     // when user scroll down , we will hide navbar , and if suddenly scroll up , we will show navbar
//     const [showNavbar, setShowNavbar] = useState('top');
//     const [lastScrollY, setLastScrollY] = useState(0);
//     useEffect(() => {
//         window.addEventListener('scroll', controlNavbar);

//         return () => {
//             window.removeEventListener('scroll', controlNavbar);
//         }
//     },)

//     // control Navbar
//     const controlNavbar = () => {
//         if (window.scrollY > 200) {
//             if (window.scrollY > lastScrollY)
//                 setShowNavbar('hide')

//             else setShowNavbar('show')
//         }

//         else setShowNavbar('top')

//         setLastScrollY(window.scrollY);
//     }

//     return (
//         <nav className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-[#2C333F] text-white translate-y-0 transition-all ${showNavbar} `}>

//             <div className='flex w-11/12 max-w-[1260px] items-center justify-between '>
//                 {/* logo */}
//                 <Link to="/">
//                     <img src={studyNotionLogo} width={160} height={42} loading='lazy' />
//                 </Link>

//                 {/* Nav Links - visible for only large devices*/}
//                 <ul className='hidden sm:flex gap-x-6 text-[#DBDDEA]'>
//                     {
//                         NavbarLinks.map((link, index) => (
//                             <li key={index}>
//                                 {
//                                     link?.title === "Catalog" ? (
//                                         <div
//                                             className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
//                                                 ? "bg-[#FFE83D] text-black rounded-xl p-1 px-3"
//                                                 : "text-[#DBDDEA] rounded-xl p-1 px-3"
//                                                 }`}
//                                         >
//                                             <p>{link?.title}</p>
//                                             <MdKeyboardArrowDown />
//                                             {/* drop down menu */}
//                                             <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em]
//                                                     flex-col rounded-lg bg-[#F1F2FF] p-4 text-[#000814] opacity-0 transition-all duration-150 group-hover:visible
//                                                     group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
//                                             >
//                                                 <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-[#F1F2FF]"></div>
//                                                 {loading ? (<p className="text-center ">Loading...</p>)
//                                                     : subLinks?.length ? (
//                                                         <>
//                                                             {subLinks?.map((subLink, i) => (
//                                                                 <Link
//                                                                     to={`/catalog/${subLink?.name
//                                                                         .split(" ")
//                                                                         .join("-")
//                                                                         .toLowerCase()}`}
//                                                                     className="rounded-lg bg-transparent py-4 pl-4 hover:bg-[#F1F2FF]0"
//                                                                     key={i}
//                                                                 >
//                                                                     <p>{subLink?.name}</p>
//                                                                 </Link>
//                                                             ))}
//                                                         </>
//                                                     ) : (
//                                                         <p className="text-center">No Courses Found</p>
//                                                     )}
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <Link to={link?.path}>
//                                             <p className={`${matchRoute(link?.path) ? "bg-[#FFE83D] text-black" : "text-[#DBDDEA]"} rounded-xl p-1 px-3 `}>
//                                                 {link.title}
//                                             </p>
//                                         </Link>)
//                                 }
//                             </li>
//                         ))}
//                 </ul>

//                 {/* Login/SignUp/Dashboard */}
//                 <div className='flex gap-x-4 items-center'>
//                     {
//                         user && user?.accountType !== "Instructor" && (
//                             <Link to="/dashboard/cart" className="relative">
//                                 <AiOutlineShoppingCart className="text-[2.35rem] text-[#F1F2FF] hover:bg-[#2C333F] rounded-full p-2 duration-200" />
//                                 {totalItems > 0 && (
//                                     <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                                         {totalItems}
//                                     </span>
//                                 )}
//                             </Link>
//                         )
//                     }
//                     {
//                         token === null && (
//                             <Link to="/login">
//                                 <button className={` px-[12px] py-[8px] text-richblack-100 rounded-md
//                                  ${matchRoute('/login') ? 'border-[2.5px] border-yellow-50' : 'border border-[#2C333F] bg-richblack-800'} `}
//                                 >
//                                     Log in
//                                 </button>
//                             </Link>
//                         )
//                     }
//                     {
//                         token === null && (
//                             <Link to="/signup">

//                                 <button className={` px-[12px] py-[8px] text-richblack-100 rounded-md
//                                  ${matchRoute('/signup') ? 'border-[2.5px] border-yellow-50' : 'border border-[#2C333F] bg-richblack-800'} `}
//                                 >
//                                     Sign Up
//                                 </button>
//                             </Link>
//                         )
//                     }

//                     {/* for large devices */}
//                     {token !== null && <ProfileDropDown />}

//                     {/* for small devices */}
//                     {token !== null && <MobileProfileDropDown />}

//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default Navbar

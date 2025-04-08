import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-[1260PX] flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-[#F1F2FF]">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-[#AFB2BF]">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-[#47A5C5]">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}

            {/* <div className="flex w-full items-center my-4 gap-x-2">
              <div className="w-full h-[1px] bg-[#2C333F]"></div>
              <p className="text-[#2C333F] font-medium leading-[1.375rem]">
                OR
              </p>
              <div className="w-full h-[1px] bg-[#2C333F] "></div>
            </div> */}

            {/* <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-[#AFB2BF]
            border border-[#2C333F] px-[12px] py-[8px] gap-x-2 mt-6">
              <FcGoogle/>
              <p>Sign Up with Google</p>
            </button> */}
          
          
          </div>
          
          
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
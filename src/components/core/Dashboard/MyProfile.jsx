import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
   
    const { user } = useSelector((state) => state.profile);
    console.log("user from redux:", user);
    const navigate = useNavigate();
    return (
        <div className="text-[#F1F2FF]">
            <h1 className="mb-14 text-3xl font-medium text-[#F1F2FF]">
                My Profile
            </h1>
            
            {/* Section-1 */}
            <div className="flex items-center justify-between rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12">
                <div className="flex items-center gap-x-4">
                    <img 
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover" 
                    />
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-[#F1F2FF]">
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className="text-sm text-[#838894]">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <IconBtn  
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                />
            </div>

            {/* Section-2 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-[#F1F2FF]">
                        About
                    </p>
                    <IconBtn 
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                        
                    />
                </div>
                <p className="text-[#6E727F] text-sm font-medium">
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
                </p>
            </div>

            {/* Section-3 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-[#F1F2FF]">
                        Personal Details
                    </p>
                    <IconBtn 
                        className="flex items-center bg-[#FFD60A] cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] undefined"
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    />
                </div>
                <div className="flex max-w-[500px] justify-between">
                   <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-[#424854]">
                                First Name
                            </p>
                            <p className="text-sm font-medium text-[#F1F2FF]">
                                {user?.firstName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-[#424854]">
                                Email
                            </p>
                            <p className="text-sm font-medium text-[#F1F2FF]">
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-[#424854]">
                                Gender
                            </p>
                            <p className="text-sm font-medium text-[#F1F2FF]">
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-[#424854]">
                                Last Name
                            </p>
                            <p className="text-sm font-medium text-[#F1F2FF]">
                                {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-[#424854]">
                                Phone Number
                            </p>
                            <p className="text-sm font-medium text-[#F1F2FF]">
                                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-[#424854]">
                                Date Of Birth
                            </p>
                            <p className="text-sm font-medium text-[#F1F2FF]">
                                {user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MyProfile

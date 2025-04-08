import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
    const { register, handleSubmit, setValue, getValues } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true)
        }
    }, [])

    const goBack = () => {
        dispatch(setStep(2))
    }

    const gotToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () => {
        //check if the form  has been updated or not
        if(
            (course?.status === COURSE_STATUS.PUBLISHED && 
                getValues("public") === true) ||
            (course?.status === COURSE_STATUS.DRAFT && 
                getValues("public") === false)
        )   {
            //form has not been updated
            //no need to make api call
            gotToCourses()
            return 
        }
        const formData = new FormData()
        formData.append("courseId", course._id)
        const courseStatus = getValues("public")
            ? COURSE_STATUS.PUBLISHED
            : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        if(result) {
            gotToCourses()
        }
        setLoading(false)
    }

    const onSubmit = (data) => {
        //console.log(data)
        handleCoursePublish()
    }

  return (
    <div className="rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-6">
        <p className="text-2xl font-semibold text-[#F1F2FF]">
            Publish Settings
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Checkbox */}
            <div className="my-6 mb-8">
                <label htmlFor="public" className="inline-flex items-center text-lg">
                    <input 
                        type="checkbox" 
                        id="public"
                        {...register("public")}
                        className="border-[#888888] h-4 w-4 rounded bg-[#F1F2FF] text-[#6E727F] focus:ring-2 focus:ring-[#F1F2FF]"
                    />
                    <span className="ml-2 text-[#6E727F]">
                        Make this course as public
                    </span>
                </label>
            </div>

            {/* Next Prev Button */}
            <div className="flex justify-end gap-x-3" >
                <button
                    disabled={loading}
                    type="button"
                    onClick={goBack}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-[#838894] py-[8px] px-[20px] font-semibold text-[#000814]"
                >
                    Back
                </button>
                <IconBtn disabled={loading} text="Save Changes" /> 
                {/* //disabled={loading} ka matlab hai ki jab takloading ki value trueho toh is button par koi action perform nahi ho paye */}
            </div>
        </form>
    </div>
  )
}

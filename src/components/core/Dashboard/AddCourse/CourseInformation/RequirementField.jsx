import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
    name, 
    label, 
    register, 
    setValue, 
    errors, 
    getvalues
}) { 
    const { editCourse, course } = useSelector((state) => state.course)
    const [requirement, setRequirement] = useState("")
    const [requirementsList, setRequirementsList] = useState([])

    useEffect(() => {
        if(editCourse) {
            setRequirementsList(course?.instructions)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
    }, [])

    useEffect(() => {
        setValue(name, requirementsList) 
    }, [requirementsList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementsList([...requirementsList, requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...requirementsList]
        updatedRequirements.splice(index, 1)
        setRequirementsList(updatedRequirements)
    }

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-[#F1F2FF]" htmlFor={name}>
                {label} <sup className="text-[#EF476F]"> * </sup>
            </label>
            <div className="flex flex-col items-start space-y-2">
                <input 
                    type="text" 
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="form-style w-full"
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="font-semibold text-[#FFD60A]"
                >
                    Add
                </button>
            </div>
            {requirementsList.length > 0 && (
                <ul className="mt-2 list-inside list-dis">
                    {requirementsList.map((requirement, index) => (
                        <li key={index} className="flex items-center text-[#F1F2FF]">
                            <span>
                                {requirement}
                            </span>
                            <button
                                type="button"
                                className="ml-2 text-xs text-[#888888]"
                                onClick={() => handleRemoveRequirement(index)}
                            >
                                Clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
                    {label} Is Required
                </span>
            )}
        </div>
    )
}
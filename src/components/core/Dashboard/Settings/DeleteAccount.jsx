import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { deleteProfile } from '../../../../services/operations/SettingsAPI'
import ConfirmationModal from '../../../common/ConfirmationModal'

const DeleteAccount = () => {

    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [modalData, setModalData] = useState(null); // State for modal data

    function showConfirmationModal() {
        setModalData({
            text1: "Delete Account",
            text2: "Deleting your account is permanent and will remove all the content associated with it.",
            btn1Text: "Yes, Delete",
            btn2Text: "No, Cancel",
            btn1Handler: confirmDeleteAccount,
            btn2Handler: closeModal,
        });
    }

    async function confirmDeleteAccount() {
        try {
            dispatch(deleteProfile(token, navigate));
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
        setModalData(null); // Close the modal
    }

    function closeModal() {
        setModalData(null); // Close the modal
    }

  return (
    <>
        <div className='my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-[#691432] bg-[#340019] p-8 px-12'>
            <div className='flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-[#691432]'>
                <FiTrash2 className='text-3xl text-[#EF476F]' />
            </div>
            <div className='flex flex-col space-y-2'>
                <h2 className='text-lg font-semibold text-[#F1F2FF]'>
                    Delete Account
                </h2>
                <div className='w-3/5 text-pink-25'>
                    <p>Would You Like To Delete Account?</p>
                    <p>
                        This account may contain Paid Courses. Deleting your account is 
                        permanent and will remove all the contain associated with it. 
                    </p>
                </div>
                <button
                    type='button'
                    className='w-fit cursor-pointer italic text-[#D43D63]'
                    onClick={showConfirmationModal}
                >
                    I want to delete my account
                </button>
            </div>
        </div>
        {/* Confirmation Modal */}
        {modalData && <ConfirmationModal modalData={modalData} />}
    </>
  )
}

export default DeleteAccount
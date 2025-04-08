
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import IconBtn from "../../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeSubSectionId, setActiveSubSectionId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );

    const section = courseSectionData[currentSectionIndex];
    const subSection = section?.subSection?.[currentSubSectionIndex];

    setActiveSectionId(section?._id);
    setActiveSubSectionId(subSection?._id);
  }, [courseSectionData, courseEntireData, location.pathname]);

  const toggleSection = (id) => {
    setActiveSectionId((prev) => (prev === id ? null : id));
  };
  //This function controls the open/close behavior of each section (i.e. accordion-style).
// When a section header is clicked:
// If it was already open, it closes it.
// If it was closed, it opens it and closes any other section.
// Step	Explanation
// id	The ID of the section that was clicked.
// prev	The currently active section (open one).
// (prev === id)	Checks if the clicked section is already open.
// null	If it's already open, set to null (collapse it).
// id	If it's not open, set it as the new active section.


  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-[#2C333F] bg-[#161D29]">
      {/* Header */}
      <div className="mx-5 flex flex-col gap-2 border-b border-[#424854] py-5 text-lg font-bold text-[#DBDDEA]">
        <div className="flex items-center justify-between">
          <div
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#AFB2BF] p-1 text-[#2C333F] hover:scale-90"
            title="Back"
          >
            <IoIosArrowBack size={30} />
          </div>
          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>
        <div>
          <p>{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-[#585D69]">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="h-full overflow-y-auto">
        {courseSectionData.map((section) => (
          <div key={section._id} className="cursor-pointer text-sm text-[#F1F2FF]">
            {/* Section Header */}
            <div
              onClick={() => toggleSection(section._id)}
              className="flex items-center justify-between bg-[#424854] px-5 py-4 transition-all"
            >
              <div className="w-[70%] font-semibold">{section?.sectionName}</div>
              <div
                className={`transition-transform duration-300 ${
                  activeSectionId === section._id ? "rotate-180" : "rotate-0"
                }`}
              >
                <BsChevronDown />
              </div>
            </div>

            {/* Sub-Sections */}
            {activeSectionId === section._id && (
              <div className="transition-all duration-500 ease-in-out">
                {section.subSection.map((topic) => (
                  <div
                    key={topic._id}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
                      );
                      setActiveSubSectionId(topic._id);
                    }}
                    className={`flex items-start gap-3 px-5 py-2 ${
                      activeSubSectionId === topic._id
                        ? "bg-[#CFAB08] font-semibold text-[#161D29]"
                        : "hover:bg-[#000814]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                      className="mt-1"
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;

















// import React from "react";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { IoIosArrowBack } from "react-icons/io"
// import { BsChevronDown } from "react-icons/bs"
// import IconBtn from "../../common/IconBtn"



// const VideoDetailsSidebar = ({setReviewModal}) => {
//   const [activeStatus, setActiveStatus] = useState("");
//   const [videobarActive, setVideoBarActive] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { sectionId, subSectionId } = useParams();
//   const {
//     courseSectionData,
//     courseEntireData,
//     totalNoOfLectures,
//     completedLectures,
//   } = useSelector((state) => state.viewCourse);

//   useEffect(() => {
//     const setActiveFlags = () => {
      
//       if (!courseSectionData.length) return;
//       const currentSectionIndex = courseSectionData.findIndex(
//         (data) => data._id === sectionId
//       );
//       const currentSubSectionIndex = courseSectionData?.[
//         currentSectionIndex
//       ]?.subSection.findIndex((data) => data._id === subSectionId);
//       const activeSubSectionId =
//         courseSectionData[currentSectionIndex]?.subSection?.[
//           currentSubSectionIndex
//         ]?._id;
//       //set current section here
//       setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
//       //set current subsection here
//       setVideoBarActive(activeSubSectionId);
//     };
//     setActiveFlags();
//   }, [courseSectionData, courseEntireData, location.pathname]);

//   // ;(() => {
//   //     if(!courseSectionData.length)
//   //         return;
//   //     const currentSectionIndex = courseSectionData.findIndex(
//   //         (data) => data._id === sectionId
//   //     )
//   //     const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
//   //         (data) => data._id === subSectionId
//   //     )
//   //     const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.
//   //     [currentSubSectionIndex]?._id;
//   //     //set current section here
//   //     setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
//   //     //set current subsection here
//   //     setVideoBarActive(activeSubSectionId);
//   // })()
//   // },[courseSectionData, courseEntireData, location.pathname])

//   return (
//     <>
//       <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-[#2C333F] bg-[#161D29]">
//         {/* for buttons and headings*/}
//         <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-[#424854] py-5 text-lg font-bold text-[#DBDDEA]">
//           {/* for buttons */}
//           <div className="flex w-full items-center justify-between ">
//             <div
//               onClick={() => {
//                 navigate(`/dashboard/enrolled-courses`);
//               }}
//               className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#AFB2BF] p-1 text-[#2C333F] hover:scale-90"
//               title="back"
//             >
//               <IoIosArrowBack size={30} />
//             </div>
//             <IconBtn
//               text="Add Review"
//               customClasses="ml-auto"
//               onclick={() => setReviewModal(true)}
//             />
//           </div>
//           {/* for heading and title */}
//           <div className="flex flex-col">
//             <p>{courseEntireData?.courseName}</p>
//             <p className="text-sm font-semibold text-[#585D69]">
//               {completedLectures?.length} / {totalNoOfLectures}
//             </p>
//           </div>
//         </div>

//         {/* for sections and subsections*/}
//         <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
//           {courseSectionData.map((section, index) => (
//             <div
//               className="mt-2 cursor-pointer text-sm text-[#F1F2FF]"
//               onClick={() => setActiveStatus(section?._id)}
//               key={index}
//             >
//               {/* Section */}
//               <div className="flex flex-row justify-between bg-[#424854] px-5 py-4">
//                 <div className="w-[70%] font-semibold">
//                   {section?.sectionName}
//                 </div>
//                 <div className="flex items-center gap-3">
//                   {/* <span className="text-[12px] font-medium">
//                         Lession {section?.subSection.length}
//                       </span> */}
//                       <span
//   className={`transition-transform duration-300 ${
//     activeStatus === section?._id ? "rotate-180" : "rotate-0"
//   }`}
// >
//   <BsChevronDown />
// </span>
//                 </div>
//               </div>

//               {/* Sub Sections */}
//               {activeStatus === section?._id && (
//                 <div className="transition-[height] duration-500 ease-in-out">
//                   {section.subSection.map((topic, i) => (
//                     <div
//                       className={`flex gap-3  px-5 py-2 ${
//                         videobarActive === topic._id
//                           ? "bg-[#CFAB08] font-semibold text-[#161D29]"
//                           : "hover:bg-[#000814]"
//                       } `}
//                       key={i}
//                       onClick={() => {
//                         navigate(
//                           `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
//                         );
//                         setVideoBarActive(topic._id);
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={completedLectures.includes(topic?._id)}
//                         onChange={() => {}}
//                       />
//                       {topic.title}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default VideoDetailsSidebar;

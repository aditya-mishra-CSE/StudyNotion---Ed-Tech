import React from 'react'
import { LearningGridArray } from "../../../data/learningGrid-links";
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button'

const LearningGrid = () => {
    return (
      <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
        {LearningGridArray.map((card, index) => {
          return (
            <div
              key={index}
              className={`${index === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
                card.order % 2 === 1
                  ? "bg-[#2C333F] h-[294px]"
                  : card.order % 2 === 0
                  ? "bg-[#161D29] h-[294px]"
                  : "bg-transparent"
              } ${card.order === 3 && "xl:col-start-2"}  `}
            >
              {card.order < 0 ? (
                <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                  <div className="text-4xl font-semibold ">
                    {card.heading}
                    <HighlightText text={card.highlightText} />
                  </div>
                  <p className="text-[#838894] font-medium">
                    {card.description}
                  </p>
  
                  <div className="w-fit mt-2">
                    <CTAButton active={true} linkto={card.BtnLink}>
                      {card.BtnText}
                    </CTAButton>
                  </div>
                </div>
              ) : (
                <div className="p-8 flex flex-col gap-8">
                  <h1 className="text-[#F1F2FF] text-lg">{card.heading}</h1>
  
                  <p className="text-[#838894] font-medium">
                    {card.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
export default LearningGrid
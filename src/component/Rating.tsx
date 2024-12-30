import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
const Rating = ({ Rating, RatingCount }: { Rating: number, RatingCount: number }) => {
    // console.log(Rating, RatingCount)
    const RatingStar = Array.from({ length: 5 }, (_, index) => {
        let number = index + 0.5;

        return (
            <span key={index}>
                {Rating > index + 1 ? <FaStar color='black' size={20} /> : Rating >= number ? <FaStarHalfAlt color='black' size={20} /> : <FaRegStar color='black' size={20} />}
            </span>
        )
    })
    return (
        <div className="flex flex-row items-center gap-3"><span className="flex flex-row">{RatingStar}</span><span className="text-[18px]">{RatingCount} </span> </div>
    )
}

export default Rating
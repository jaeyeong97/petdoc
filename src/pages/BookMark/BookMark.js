import { useContext, useState } from "react";
import { HospitalList } from "../../App";
import BottomMenu from "../../component/BottomMenu/BottomMenu";
import BookMarkItem from "./BookMarkItem/BookMarkItem"
import "./BookMark.css";


const BookMark = () => {
    const hospitalList = useContext(HospitalList);

    return (
        <div className="BookMark">
            <h2 className="title">즐겨찾기</h2>
            <div className="BookMarkItemWrap">
                {hospitalList.filter((hospital) => (hospital.bookmark === true))
                    .map((item) => (
                        <BookMarkItem key={item.hos_id} {...item} />
                    ))}
            </div>
            <BottomMenu />
        </div>
    );
}

export default BookMark;
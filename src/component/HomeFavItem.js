import "../css/HomeFavItem.css";
import { useNavigate } from "react-router-dom";
import BookMarkStar from "./BookMarkStar";

const HomeFavItem = ({ hos_id, hos_name, open_hours, bookmark, call }) => {
    const navigate = useNavigate();

    const handleCall = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    }; // 전화하기 기능 

    return (
        <div className="HomeFavItem">
            <div className="favName">
                <h3>{hos_name}</h3>
                <BookMarkStar id={hos_id} book={bookmark}/>
            </div>
            <div className="favHour">
                <div className="officeHour">
                    진료시간: {open_hours.open_time} ~ {open_hours.close_time}
                </div>
                <div className="lunchTime">
                    점심시간: {open_hours.lunch_start} ~ {open_hours.lunch_end}
                </div>
            </div>
            <div className="favBtns">
                <button className="btnReserv"
                    onClick={() => { navigate(`/reservation/${hos_id}`) }}
                >
                    예약하기
                </button>
                <button className="btnCall" onClick={()=>{handleCall(call)}}>
                    <img src={`/img/call.png`} alt="callBtn" />
                </button>
            </div>
        </div>
    );
};
export default HomeFavItem;

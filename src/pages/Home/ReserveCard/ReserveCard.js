import Button from "../../../component/Button/Button";
import "./ReserveCard.css";

const ReserveCard = ({ reserve_date, reserve_purpose, symptom, hospital_name, hospital_address, hospital_number, reserve_time, setCardOpen }) => {
    return (
        <div className="ReserveCard">
            <h3 className="date_top">
                {new Date(reserve_date).getFullYear()}년&nbsp;
                {new Date(reserve_date).getMonth() + 1}월&nbsp;
                {new Date(reserve_date).getDate()}일&nbsp;
                방문예정일 입니다.
            </h3>
            <div>
                <div className='hospital'>
                    <h5>병원정보</h5>
                    <p>{hospital_name}</p>
                    <p className="address">{hospital_address}</p>
                    <p className="call_num">
                        <span className="material-symbols-outlined">call</span>
                        {hospital_number}
                    </p>
                </div>
                <div className='date'>
                    <p className="date_num">{new Date(reserve_date).toLocaleDateString()}</p>
                    <p className="date_time">{reserve_time} 방문예약</p>
                </div>
                <div className=''>
                    <h5>방문 목적</h5>
                    <p>
                        {`${reserve_purpose}`}
                    </p>
                </div>
                <div className='symptom'>
                    <h5>증상</h5>
                    <p>{symptom}</p>
                </div>
            </div>
            <Button btnName={'close'} btnClick={() => { setCardOpen(false) }} btnText={<span className="material-symbols-outlined">close</span>} />
        </div>
    );
};

export default ReserveCard;
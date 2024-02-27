import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Reservation.css"

const ReserConfirm = ({ setConfirmOpen, handleReservation }) => {

    const [checkedItems, setCheckedItems] = useState(false);
    const navigate = useNavigate()

    const handleCheck = () => {
        setCheckedItems(true);
    }
    const handleReservationSubmit =()=>{
        checkedItems? handleReservation() : alert('주의사항을 동의해야 확정이 가능합니다.')
        
    }
    const handlecheckfix = (setCheckedItems) => {
        if(setCheckedItems === false){
            alert('예약 시 주의사항을 확인해주세요')
        }
    }

    return (
        <div className="ReserConfirm">
            <h3>예약시 주의사항</h3>
            <Button btnName={'close'} btnClick={() => { setConfirmOpen(false) }} btnText={<span className="material-symbols-outlined">close</span>} />
            <div className="confirmText">
                <p> 1. 예약한 진료에 못 오시는 경우 늦어도 진료 2시간 전까지 예약취소 또는 변경을 하셔야 합니다.</p>

                <p>2. 예약취소 없이 진료에 오지 않은 횟수가 3회를 경과하면 1년간 Petdoc 모바일예약 사용이 제한됩니다.(전화예약만 가능)</p>

                <p>3. 특정 센터 및 의료진은 병원정책상 모바일예약이 불가하며, 전화예약만 가능합니다.</p>

                <p>4. 예약시간에 맞춰 내원하시더라도, 병원의 상황에 따라 대기시간이 발생할 수 있는 점 양해 부탁드립니다.</p>
            </div>
            <div className="confirmcheck">
                <input type="checkbox" onClick={handleCheck}/>
                <label>네. 확인하였습니다.</label>
            </div>
            <Button
                btnName={'confirmfix'}
                btnText={'예약 확정'}
                btnClick={handleReservationSubmit}
            />

        </div>
    )
}

export default ReserConfirm;
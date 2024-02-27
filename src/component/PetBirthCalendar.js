import Calendar from "react-calendar";
import '../css/PetBirthCalendar.css';
import moment from "moment";
import { useRef } from "react";

const PetBirthCalendar = ({petName, date, setDate}) => {
    const calRef = useRef();

    const now = new Date().getTime();
    const checkTime = now - date.getTime();
    const calcTime = moment.duration(checkTime);
    const diffYears = Math.floor(calcTime.asYears());
    const diffMonths = Math.floor(calcTime.asMonths()) % 12;

    return (
        <div className="PetBirthCalendar">
            <Calendar 
                value={date}
                onChange={setDate}
                formatDay={(locale, date) => moment(date).format("DD")}
                maxDate={new Date()}
            />
            <div className="calendarDate" ref={calRef}>
                {moment(date).format(`${petName}의 생일은 YYYY년 MM월 DD일이며, 태어난지 약 ${diffYears}년 ${diffMonths}개월 되었습니다. `)}
            </div>
        </div>
    );
}
export default PetBirthCalendar;
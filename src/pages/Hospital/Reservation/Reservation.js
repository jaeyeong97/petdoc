import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AnimalList, AnimalListDispatch } from "../../../App";
import { HospitalList } from "../../../App";
import ReserConfirm from "./ReserConfirm"
import Button from "../../../component/Button/Button";
import moment from "moment";
import Calendar from "react-calendar";
import './Reservation.css'

const Reservation = () => {
    const hospitalList = useContext(HospitalList);
    const animalList = useContext(AnimalList);
    const navigate = useNavigate();
    let arr = [];
    const { onReserveAdd } = useContext(AnimalListDispatch)
    const { hos_id } = useParams();
    const [reserHos, setReserHos] = useState({});
    const [animal, setAnimal] = useState('');
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState([arr]);
    const [visit, setVisit] = useState('');
    const [plus, setPlus] = useState('')
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState('')
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedTimeButton, setSelectedTimeButton] = useState('');

    const handleconfirm = () => {
        setConfirmOpen(true);
    }
    const handleClickAnimal = (animal) => {
        setAnimal(animal);
        setSelectedPet(animal.pet_id)
    }
    const handleClickmoment = (e) => {
        setDay(e.target.value)
    }
    const handleclickTime = (itresertime) => {
        setSelectedTimeButton(itresertime)
        setTime(itresertime);
    }
    const handleclickFor = (hos_service) => {
        setSelectedButton(hos_service);
        setVisit(hos_service)
    }
    const chnageplus = (e) => {
        setPlus(e.target.value);
    }

    const handleReservation = () => {
        onReserveAdd(day, time, visit, plus, reserHos.hos_id, reserHos.hos_name, reserHos.address, reserHos.call, animal.pet_id)
        navigate('/petpage', { state: { isMyPet: false } });
    }

    useEffect(() => {
        if (hospitalList.length >= 1) {
            const targetHos = hospitalList.find((it) =>
                parseInt(it.hos_id) === parseInt(hos_id)
            );
            if (targetHos) {
                setReserHos(targetHos);
            }
        }
    }, [hos_id, reserHos])
    const reserOpen = parseInt(reserHos.open_hours && reserHos.open_hours.open_time.substring(0, 2));
    const reserClose = parseInt(reserHos.open_hours && reserHos.open_hours.close_time.substring(0, 2));
    for (let i = reserOpen; i <= reserClose; i++) {
        arr.push(`${i}:00`)
    }

    return (
        <div className="Reservation">
            <div className="ReserWrap">
                <div className="ReserHead">
                    <Button
                        btnText={
                            <div>
                                <p><span className='material-icons-outlined'>arrow_back</span></p>
                            </div>
                        }
                        btnClick={() => { navigate(-1) }}
                    />
                    <h2>예약하기</h2>
                </div>
                <div className="ReserAnimal">
                    {animalList.map((animal) =>
                    (<div key={animal.pet_id} {...animal} >
                        <Button
                            btnText={
                                <div>
                                    <p className="ani_photo"><img src={animal.pet_photo} /></p>
                                    <p>{animal.pet_name}</p>
                                </div>
                            }
                            btnValue={animal.pet_id}
                            btnClick={() => handleClickAnimal(animal)}
                            btnName={selectedPet === animal.pet_id ? '' : 'selected-animal'}
                        />
                    </div>
                    ))}
                </div>
                <div className="ReserHospital">
                    {reserHos.hos_name}
                </div>
                <div className="ReserCal">
                    <div className='ReserCalendar'>
                        <Calendar
                            className={'reservecalendar'}
                            onChange={setDay}
                            value={day}
                            formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                            next2Label={null} // 두 달씩 안넘어가도록
                            prev2Label={null}
                            minDate={new Date()} // 지난 날짜는 비활성화
                            onClickDay={() => handleClickmoment}
                        />
                        <div className="reserDay">
                            {moment(day).format("YYYY년 MM월 DD일")}
                        </div>
                    </div>
                </div>
                <div className="ReserTime">
                    <h3>시간을 선택해주세요</h3>
                    {arr.map((it) =>
                        <Button key={it}{...it}
                            btnText={it}
                            btnValue={it}
                            btnClick={() => handleclickTime(it)}
                            btnName={'itresertime'}
                            isSelected={selectedTimeButton === it}
                        />
                    )}
                </div>
                <div className="ReserFor">
                    <h3>어떤 일로 방문 예정입니까?</h3>
                    <div>
                        <Button
                            btnName={'hos_service'}
                            btnText={'진료'}
                            btnClick={() => { handleclickFor('진료') }}
                            isSelected={selectedButton === '진료'}
                        />
                        <Button
                            btnName={'hos_service'}
                            btnText={'접종'}
                            btnClick={() => { handleclickFor('접종') }}
                            isSelected={selectedButton === '접종'}
                        />
                        <Button
                            btnName={'hos_service'}
                            btnText={'호텔'}
                            btnClick={() => { handleclickFor('호텔') }}
                            isSelected={selectedButton === '호텔'}
                        />
                        <Button
                            btnName={'hos_service'}
                            btnText={'미용'}
                            btnClick={() => { handleclickFor('미용') }}
                            isSelected={selectedButton === '미용'}
                        />
                    </div>
                    <textarea className="Resertext" placeholder="추가적인 전달사항을 입력해주세요" value={plus} onChange={chnageplus}></textarea>
                </div>
                {confirmOpen && <ReserConfirm setConfirmOpen={setConfirmOpen} handleReservation={handleReservation} day={day} setDay={setDay} />}
                <Button
                    btnText={'예약하기'}
                    btnName={'Reserbtn'}
                    btnClick={handleconfirm}
                />
            </div>
        </div>
    );
};

export default Reservation;

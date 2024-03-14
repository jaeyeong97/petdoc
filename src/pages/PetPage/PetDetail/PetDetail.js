import { useEffect, useState, useContext } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import "./PetDetail.css";
import PetRecord from "../PetRecord/PetRecord";
import Button from "../../../component/Button/Button";
import { AnimalListDispatch } from "../../../App";


const PetDetail = ({
    pet_id,
    pet_birth,
    pet_name,
    pet_breed,
    pet_sex,
    pet_weight,
    pet_disease,
    pet_symptoms,
}) => {
    const navigate = useNavigate();
    const { onSymptomRemove } = useContext(AnimalListDispatch);
    const [value, onChange] = useState(new Date());
    const [isSymptom, setIsSymptom] = useState(pet_symptoms);
    const { onRemove } = useContext(AnimalListDispatch);

    // 현재 날짜
    const currentDate = new Date();
    // 날짜 계산
    const calculateAge = (birthdate, currentDate) => {
        const diffInMilliseconds = currentDate - birthdate;

        const years = Math.floor(
            diffInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
        );

        const remainingTime = diffInMilliseconds % (365.25 * 24 * 60 * 60 * 1000);
        const months = Math.floor(remainingTime / (30.44 * 24 * 60 * 60 * 1000));

        return { years, months };
    };

    useEffect(() => {
        if (pet_symptoms) {
            handleCalendar(value);
        }
    }, [value, pet_symptoms]);

    const handleCalendar = (value) => {
        const morning = new Date(value);
        morning.setHours(0, 0, 0, 0);
        const afternoon = new Date(value);
        afternoon.setHours(23, 59, 59, 999);
        setIsSymptom(
            pet_symptoms && pet_symptoms.filter((item) =>
                morning <= new Date(item.symptom_date) && new Date(item.symptom_date) <= afternoon)
        )
    };

    const handleDelete = (id) => {
        window.confirm('삭제하시면 복구할 수 없습니다. 정말 삭제하시겠습니까?')
        onRemove(id);
        navigate(`/petpage/`);
    }

    const handleSymptomDelete = (symptomId) => {
        const shouldDelete = window.confirm('해당 날짜의 증상을 삭제하시겠습니까?');
        if (shouldDelete) {
            onSymptomRemove(symptomId);
        }
    };

    return (
        <div className="PetDetail">
            <div className="PetDetailBorder">
                <div className="PetDetailIn">
                    <div className="petName">
                        <h3>{pet_name}</h3>
                    </div>
                    <div className="type">
                        <p>{pet_breed}</p>
                        <p>{pet_sex}</p>
                    </div>
                    <div className="age">
                        <p>
                            {calculateAge(new Date(pet_birth), currentDate).years}년{" "}
                            {calculateAge(new Date(pet_birth), currentDate).months}
                            개월
                        </p>
                        <p>({new Date(pet_birth).toLocaleDateString()})</p>
                    </div>
                    <div className="weight">
                        <h4>{pet_weight}Kg</h4>
                    </div>
                    <div className="illness">
                        <span>질병이력</span>
                        {pet_disease}
                    </div>
                </div>
                <div className="PetDetailEdit">
                    <div
                        className="goto"
                        onClick={() => {
                            navigate(`/editpets/${pet_id}`);
                        }}
                    >
                        수정하기
                    </div>
                    <div onClick={() => { handleDelete(pet_id) }}>삭제하기</div>
                </div>
            </div>
            <div className="calendarTitle">
                <h3>증상 체크리스트</h3>
            </div>
            <Calendar
                value={value}
                onChange={onChange}
                onClickDay={() => { handleCalendar(value) }}
                formatDay={(locale, date) => moment(date).format("DD")}
                maxDate={new Date()}
            />
            <div className="CalDate">{moment(value).format("YYYY년 MM월 DD일")}</div>
            {isSymptom && isSymptom.length > 0 ? (
                <>
                    {isSymptom.map((item) => (
                        <div key={item.symptom_date}>
                            <div className="symptomList">
                                <p><span>기침</span><span>{item.cough}</span></p>
                                <p><span>콧물</span><span>{item.runningNose}</span></p>
                                <p><span>식욕</span><span>{item.hunger}</span></p>
                                <p><span>소변</span><span>{item.urine}</span></p>
                                <p><span>대변</span><span>{item.excrement}</span></p>
                                <p><span>체온</span><span>{item.temperature}</span></p>
                                <p><span>활동성</span><span>{item.active}</span></p>
                                <p><span>기타</span><span>{item.misc}</span></p>

                            </div>
                            <div className="btnList">
                                <Button
                                    btnClick={() => handleSymptomDelete(item.symptom_id)}
                                    btnText={'삭제하기'} />
                            </div>
                        </div>
                    ))}

                </>
            ) : (
                <PetRecord
                    calValue={value}
                    pet_id={pet_id}
                />
            )}
        </div>
    );
};
export default PetDetail;

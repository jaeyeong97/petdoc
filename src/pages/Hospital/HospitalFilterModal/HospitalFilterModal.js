import { useCallback, useState } from "react";
import Button from "../../../component/Button/Button";

const HospitalFilterModal = ({ checkValueHandle }) => {
    const [viewModal, setViewModal] = useState(true);
    const handleViewModal = () => {
        setViewModal(!viewModal);
    }
    //진료동물 리스트
    const animalValid = {
        dog: '강아지',
        cat: '고양이',
        hamster: '햄스터',
        hadgehog: '고슴도치',
        guineaPig: '기니피그',
        trutle: '거북이',
        ferret: '페럿',
        birds: '조류',
        specialAni: '특수동물',
    };
    //서비스 리스트
    const serviceValid = {
        parking: '주차',
        beauty: '미용',
        hotel: '호텔',
        allDay: '24시'
    };
    //check된 요소 배열
    const [checkedList, setCheckedList] = useState([]);
    //체크된 상태인지 파악하기 위한 state
    const [isChecked, setIsChecked] = useState(false);
    // 필터적용 버튼을 누르면 배열에 값이 담겨있는지 확인하는 함수
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        checkValueHandle(checkedList);
        setViewModal(!viewModal);
    }, [checkValueHandle, checkedList, viewModal]);
    // input을 클릭했을 때, checked라는 useState 배열에 해당 value가 포함되어있지 않으면 추가
    // 배열에 이미 포함되어있으면 해당 배열에서 제거하는 handler 함수
    const checkedItemHandler = (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
            return;
        }

        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value))
            return;
        }
        return;
    }

    // 필터 체크박스 onchange 함수
    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);
    };
    // 모든 체크박스를 해제, checkedList를 빈 배열로 만드는 함수
    const allDelete = () => {
        setCheckedList([]);
        setIsChecked(false);
    }

    if (viewModal) {
        return (
            <div className="HospitalFilterModalBtn_wrap">
                <div className="HospitalFilterModalBtn" onClick={handleViewModal}>
                    <span className="material-symbols-outlined">tune</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="HospitalFilterModal">
                <div className="modalTop">
                    <span className="material-symbols-outlined closeModalBtn" onClick={handleViewModal}>arrow_back</span>
                    <h3>동물병원 상세검색</h3>
                    <button onClick={allDelete}>초기화</button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="possPet">
                        <h5>진료동물</h5>
                        <div>
                            {Object.entries(animalValid).map(([key, value], idx) => (
                                <div className="FilterCheckBox" key={idx}>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        name={key}
                                        id={key}
                                        checked={checkedList.includes(value)}
                                        onChange={(e) => checkHandler(e, value)}
                                    />
                                    <label htmlFor={key}>{value}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="possService">
                        <h5>서비스</h5>
                        <div>
                            {Object.entries(serviceValid).map(([key, value], idx) => (
                                <div className="FilterCheckBox" key={idx}>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        name={key}
                                        id={key}
                                        checked={checkedList.includes(value)}
                                        onChange={(e) => checkHandler(e, value)}
                                    />
                                    <label htmlFor={key}>{value}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="btnBox">
                        <Button btnText={'필터 적용'} btnName={'submit'} type='submit' />
                    </p>
                </form>
            </div>
        )
    }
}

export default HospitalFilterModal;
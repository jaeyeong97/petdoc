import { useState } from "react";
import Button from "../../../component/Button/Button";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";

const HospitalFilterModal = ({ checkValueHandle }) => {
    const [viewModal, setViewModal] = useState(true);
    const handleViewModal = () => {
        setViewModal(!viewModal);
    }

    const [dog, setDog] = useState(false);
    const [cat, setCat] = useState(false);
    const [hamster, setHamster] = useState(false);
    const [hadgehog, setHadgehog] = useState(false);
    const [guineaPig, setGuineaPig] = useState(false);
    const [turtle, setTurtle] = useState(false);
    const [ferret, setFerret] = useState(false);
    const [birds, setBirds] = useState(false);
    const [specialAni, setSpecialAni] = useState(false);
    const [parking, setParking] = useState(false);
    const [beauty, setBeauty] = useState(false);
    const [hotel, setHotel] = useState(false);
    const [allDay, setAllDay] = useState(false);
    const checkboxHandle = (id, check) => {
        checkValueHandle(id, check)
    }
    const changeDog = () => {
        setDog(!dog)
    }
    const changeCat = () => {
        setCat(!cat)
    }
    const changeHamster = () => {
        setHamster(!hamster)
    }
    const changeHadgehog = () => {
        setHadgehog(!hadgehog);
    }
    const changeGuineaPig = () => {
        setGuineaPig(!guineaPig);
    }
    const changeTurtle = () => {
        setTurtle(!turtle);
    }
    const changeFerret = () => {
        setFerret(!ferret);
    }
    const changeBirds = () => {
        setBirds(!birds);
    }
    const changeSpecialAni = () => {
        setSpecialAni(!specialAni);
    }
    const changeParking = () => {
        setParking(!parking);
    }
    const changeBeauty = () => {
        setBeauty(!beauty);
    }
    const changeHotel = () => {
        setHotel(!hotel);
    }
    const changeAllDay = () => {
        setAllDay(!allDay);
    }
    const changeAllCheckBox = () => {
        setDog(false);
        setCat(false);
        setHamster(false);
        setHadgehog(false);
        setGuineaPig(false);
        setTurtle(false);
        setFerret(false);
        setBirds(false);
        setSpecialAni(false);
        setParking(false);
        setBeauty(false);
        setHotel(false);
        setAllDay(false);
    }

    if (viewModal === true) {
        return (
            <div className="HospitalFilterModalBtn_wrap">
                <div className="HospitalFilterModalBtn" onClick={handleViewModal}>
                    <span className="material-symbols-outlined">tune</span>
                </div>
            </div>
        )
    } else {
        return (
            <div div className="HospitalFilterModal" >
                <div className="modalTop">
                    <span className="material-symbols-outlined closeModalBtn" onClick={handleViewModal}>arrow_back</span>
                    <h3>동물병원 상세검색</h3>
                    <Button btnText={'초기화'} btnClick={changeAllCheckBox} />
                </div>
                <div className="possPet">
                    <h5>진료동물</h5>
                    <div>
                        <FilterCheckBox value={'강아지'} check={dog}
                            onClick={() => changeDog()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'고양이'} check={cat} onClick={() => changeCat()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'햄스터'} check={hamster} onClick={() => changeHamster()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'고슴도치'} check={hadgehog} onClick={() => changeHadgehog()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'기니피그'} check={guineaPig} onClick={() => changeGuineaPig()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'거북이'} check={turtle} onClick={() => changeTurtle()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'페럿'} check={ferret} onClick={() => changeFerret()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'조류'} check={birds} onClick={() => changeBirds()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'특수동물'} check={specialAni} onClick={() => changeSpecialAni()} onChange={checkboxHandle} />
                    </div>
                </div>
                <div className="possService">
                    <h5>서비스</h5>
                    <div>
                        <FilterCheckBox value={'주차'} check={parking} onClick={() => changeParking()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'미용'} check={beauty} onClick={() => changeBeauty()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'호텔'} check={hotel} onClick={() => changeHotel()} onChange={checkboxHandle} />
                        <FilterCheckBox value={'24시'} check={allDay} onClick={() => changeAllDay()} onChange={checkboxHandle} />
                    </div>
                </div>
                <p className="btnBox">
                    <Button btnText={'필터 적용'} btnClick={handleViewModal} btnName={'submit'} />
                </p>
            </div >
        )
    }



}

export default HospitalFilterModal;
import "./Hospital.css";
import { useState, useContext, useMemo, useEffect } from "react";
import SearchBar from "../../component/SearchBar/SearchBar";
import HospitalCate from "./HospitalCate/HospitalCate";
import { HospitalList } from "../../App";
import HospitalFilterModal from "./HospitalFilterModal/HospitalFilterModal";
import Button from "../../component/Button/Button";

const Hospital = ({ handleBookmarkClick, bookmarkedHos }) => {
    const hospitalList = useContext(HospitalList);
    const [searchHospital, setSearchHospital] = useState(""); //검색바 필터링
    const [isMap, setIsMap] = useState(false); // 지도, 리스트 토글 상태관리
    const [selectAnimals, setSelectAnimals] = useState([]); // 병원 state

    // 지도, 리스트 토글 함수
    const handleMap = () => {
        setIsMap(!isMap);
    };

    // 병원 리스트 초기화
    useEffect(() => {
        setSelectAnimals(hospitalList);
    }, [hospitalList]);

    // 체크된 항목 필터링
    const checkValueHandle = (list) => {
        if (list.length === 0) {
            // 빈 배열일 경우 원래의 병원 리스트로 필터링
            setSelectAnimals(hospitalList);
        } else {
            // 필터링된 병원 리스트 적용
            setSelectAnimals(hospitalList.filter(hospital =>
                list.every(item =>
                    hospital.poss_animals.includes(item) || hospital.service.includes(item)
                )
            ));
        }
    };

    //검색창 필터링 함수
    const filterSearch = useMemo(() => {
        return searchHospital === ""
            ? selectAnimals
            : selectAnimals.filter((it) =>
                it.hos_name.toLowerCase().includes(searchHospital.toLowerCase())
            );
    }, [selectAnimals, searchHospital]);

    return (
        <div className="Hospital">
            <div className="search">
                <SearchBar
                    type="text"
                    search={searchHospital}
                    setSearch={setSearchHospital}
                    searchName={"searchBar"}
                />
            </div>
            <HospitalCate
                filterSearch={filterSearch}
                isMap={isMap}
                handleBookmarkClick={handleBookmarkClick}
                bookmarkedHos={bookmarkedHos}
            />
            <HospitalFilterModal checkValueHandle={checkValueHandle} />
            {isMap ? (
                <Button
                    btnClick={handleMap}
                    btnText={
                        <div className="mapToggle">
                            <span className="material-symbols-outlined">
                                format_list_bulleted
                            </span>
                            <span>리스트 보기</span>
                        </div>
                    }
                />
            ) : (
                <Button
                    btnClick={handleMap}
                    btnText={
                        <div className="mapToggle">
                            <span className="material-symbols-outlined">map</span>
                            <span>지도 보기</span>
                        </div>
                    }
                />
            )}
        </div>
    );
};

export default Hospital;

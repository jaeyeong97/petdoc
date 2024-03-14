import "./Hospital.css";
import { useState, useContext, useMemo } from "react";
import SearchBar from "../../component/SearchBar/SearchBar";
import HospitalCate from "./HospitalCate/HospitalCate";
import { HospitalList } from "../../App";
import HospitalFilterModal from "./HospitalFilterModal/HospitalFilterModal";
import Button from "../../component/Button/Button";

const Hospital = () => {
    const hospitalList = useContext(HospitalList);
    const [searchHospital, setSearchHospital] = useState(""); //검색바 필터링
    const [isMap, setIsMap] = useState(true);
    const handleMap = () => {
        setIsMap(!isMap);
    };

    const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelectedItem = (id, checked) => {
        setSelectedItems((prevItems) => {
            if (checked) {
                return [...prevItems, id];
            } else {
                return prevItems.filter((itemId) => itemId !== id);
            }
        });
    };

    const [selectAnimals, setSelectAnimals] = useState(hospitalList);

    const checkValueHandle = (id, checked) => {
        toggleSelectedItem(id, checked);
        setSelectAnimals((prevAnimals) =>
            checked
                ? prevAnimals.filter((hospital) => {
                    return (
                        hospital.poss_animals.includes(`${id}`) ||
                        hospital.service.join().includes(`${id}`)
                    );
                })
                : hospitalList
        );
    };

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
                searchHospital={searchHospital}
                isMap={isMap}
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

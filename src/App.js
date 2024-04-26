import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import React, { useEffect, useState, useReducer, useRef } from 'react';
import Loading from './pages/Loading/Loading';
import Home from './pages/Home/Home';
import Hospital from './pages/Hospital/Hospital';
import Consult from './pages/Consult/Consult';
import SearchPage from './pages/Search/SearchPage';
import HospitalInfo from './pages/Hospital/HospitalInfo/HospitalInfo';
import Reservation from './pages/Hospital/Reservation/Reservation';
import PetPage from './pages/PetPage/PetPage';
import PetDetail from './pages/PetPage/PetDetail/PetDetail';
import BookMark from './pages/BookMark/BookMark';
import AddPetPage from './pages/PetPage/EditPets/AddPet/AddPetPage';
import EditPetPage from './pages/PetPage/EditPets/EditPet/EditPetPage';
import { hospitalDummy } from '../src/util/dummy';
import BottomMenu from './component/BottomMenu/BottomMenu';
import ScrollTop from './component/ScrollTop/ScrollTop';
import '../src/App.css';
import 'react-calendar/dist/Calendar.css'

const petDummyList = [
    {
        pet_id: 1,
        pet_name: '라이',
        pet_breed: '말티푸',
        pet_sex: '여',
        pet_birth: 1631000000000,
        pet_weight: 4,
        pet_disease: '없음',
        pet_photo: '/img/dog.jpg',
        reservations: [
            {
                reserve_id: 0,
                reserve_date: '2024/02/27',
                reserve_time: '10:00',
                reserve_purpose: '진료',
                symptom: '구토, 노란 눈꼽 등',
                hospital_name: '바로 동물병원',
                hospital_address: '울산광역시 남구 화합로 197 1층 바로동물병원',
                hospital_number: '052 - 250 - 1234'
            },
            {
                reserve_id: 1,
                reserve_date: '2024/02/19',
                reserve_time: '10:00',
                reserve_purpose: '미용',
                symptom: '없음 ',
                hospital_name: '이루아 동물병원',
                hospital_address: '울산광역시 남구 화합로 197 1층 바로동물병원',
                hospital_number: '052 - 250 - 5678'
            }
        ],
        pet_symptoms: [
            {
                symptom_id: 1,
                symptom_date: "2024/01/01",
                cough: "1~3회",
                runningNose: "투명함",
                hunger: "감소",
                urine: "0~2회",
                excrement: "0회",
                temperature: "낮음",
                active: "거의 없음",
                misc: "물을 많이 마시지 않음.",
            },
        ],
    },
    {
        pet_id: 2,
        pet_name: '하쿠',
        pet_breed: '믹스묘',
        pet_sex: '여',
        pet_birth: 1651363200000,
        pet_weight: 3,
        pet_disease: '허피스',
        pet_photo: '/img/cat.jpg',
        reservations: [
            {
                reserve_id: 3,
                reserve_date: '2024/02/13',
                reserve_time: '10:00',
                reserve_purpose: '예방접종',
                symptom: '기침',
                hospital_name: '메이 동물병원',
                hospital_address: '울산광역시 중구 번영로 581(남외동)',
                hospital_number: '052 - 211 - 3375'
            }
        ],
        pet_symptoms: []
    }
]

let newState = petDummyList;
let newHospital = hospitalDummy;
const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        case 'CREATE': {
            const newItem = {
                ...action.data
            }
            newState = [...newState, newItem];
            break;
        }
        case 'REMOVE': {
            newState = state.filter((item) => item.pet_id !== action.targetID);
            break;
        }
        case 'EDIT': {
            newState = state.map((item) =>
                item.pet_id === action.data.pet_id ? { ...action.data } : item);
            break;
        }
        case 'RESVERADD': {
            const { data } = action;
            newState = state.map((item) => {
                if (item.pet_id === data.pet_id) {
                    // 반려동물 객체를 찾았으면 해당 객체를 수정하고 반환
                    return {
                        ...item,
                        reservations: [data, ...item.reservations]
                    };
                }
                return item;
            });
            break;
        }
        case 'RESVERREMOVE': {
            const { reservationId } = action;
            newState = state.map((item) => {
                if (item.reservations) {
                    const newReservations = item.reservations.filter(
                        (reservation) => reservation.reserve_id !== reservationId
                    );

                    return {
                        ...item,
                        reservations: newReservations
                    };
                }
                return item;
            });
            break;
        }
        case "SYMPTOMADD": {
            const { data } = action;
            newState = state.map((item) => {
                if (item.pet_id === data.pet_id) {
                    const petSymptoms = Array.isArray(item.pet_symptoms)
                        ? item.pet_symptoms
                        : [];
                    return {
                        ...item,
                        pet_symptoms: [
                            ...petSymptoms,
                            {
                                symptom_id: data.symptom_id,
                                symptom_date: data.symptom_date,
                                cough: data.cough,
                                runningNose: data.runningNose,
                                hunger: data.hunger,
                                urine: data.urine,
                                excrement: data.excrement,
                                temperature: data.temperature,
                                active: data.active,
                                misc: data.misc,
                            },
                        ],
                    };
                }
                return item;
            });
            break;
        }
        case 'SYMPTOMREMOVE': {
            const { symptom_id } = action;
            newState = state.map((item) => {
                if (item.pet_symptoms) {
                    const newSymptoms = item.pet_symptoms.filter(
                        (symptom) => symptom.symptom_id !== symptom_id
                    );

                    return {
                        ...item,
                        pet_symptoms: newSymptoms
                    };
                }
                return item;
            });
            break;
        }

        case 'CHANGEFAV': {
            const { data } = action;
            newHospital = state.map((hospital) => {
                if (hospital.hos_id === data.hos_id) {
                    return {
                        ...hospital,
                        bookmark: data.bookmark
                    };
                }
                return hospital;
            });
        }
        default:
            return state;

    }
    return newState;
};
export const HospitalList = React.createContext();
export const AnimalList = React.createContext();
export const AnimalListDispatch = React.createContext();
export const Favorite = React.createContext();

function App() {

    const [loading, setLoading] = useState(true); // 로딩페이지 

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const [data, dispatch] = useReducer(reducer, petDummyList); //반려동물 데이터
    const [hosData, hosdispatch] = useReducer(reducer, hospitalDummy); // 동물병원 데이터
    const dataId = useRef(3);
    const reserveId = useRef(2);
    const reserve = useRef([]);
    const symptomList = useRef([]);
    const symptomId = useRef(2);

    const [bookmarkedHos, setBookmarkedHos] = useState([]); // 북마크 배열

    const handleBookmarkClick = (hospital) => {
        // 이미 북마크된 경우 해당 병원을 북마크 배열에서 제거하고, 아닌 경우에는 추가
        if (bookmarkedHos.some(item => item.hos_id === hospital.hos_id)) {
            // 이미 북마크된 경우 해당 병원을 북마크 배열에서 제거
            setBookmarkedHos(prev => prev.filter(item => item.hos_id !== hospital.hos_id));
        } else {
            // 아직 북마크되지 않은 경우 해당 병원을 북마크 배열에 추가
            setBookmarkedHos(prev => [...prev, hospital]);
        }
    };
    // 페이지가 로드될 때 로컬 스토리지에서 북마크 배열 불러오기
    useEffect(() => {
        const localBookmarks = JSON.parse(localStorage.getItem('bookmarkedHos')) || [];
        setBookmarkedHos(localBookmarks);
    }, []);
    // 로컬 스토리지에 북마크 배열 저장
    useEffect(() => {
        localStorage.setItem('bookmarkedHos', JSON.stringify(bookmarkedHos));
    }, [bookmarkedHos]);

    const onCreate = (pet_name, pet_breed, pet_sex, date, pet_weight, pet_disease, pet_photo) => {
        dispatch({
            type: 'CREATE',
            data: {
                pet_id: dataId.current,
                pet_name,
                pet_breed,
                pet_sex,
                pet_birth: new Date(date).getTime(),
                pet_weight,
                pet_disease,
                pet_photo,
                reservations: reserve.current,
                pet_symptoms: symptomList.current
            }
        });
        dataId.current += 1;

    };

    const onRemove = (targetID) => {
        dispatch({
            type: 'REMOVE',
            targetID
        });
    }

    const onEdit = (targetID, pet_name, pet_breed, pet_sex, date, pet_weight, pet_disease) => {
        dispatch({
            type: 'EDIT',
            data: {
                pet_id: targetID,
                pet_name,
                pet_breed,
                pet_sex,
                pet_birth: new Date(date).getTime(),
                pet_weight,
                pet_disease
            }
        });
    }

    const onReserveAdd = (date, reserve_time, reserve_purpose, symptom, hospital_id, hospital_name, hospital_address, hospital_number, pet_id) => {
        dispatch({
            type: 'RESVERADD',
            data: {
                reserve_id: reserveId.current,
                reserve_date: new Date(date).getTime(),
                reserve_time,
                reserve_purpose,
                symptom,
                hospital_id,
                hospital_name,
                hospital_address,
                hospital_number,
                pet_id
            }
        })
        reserveId.current += 1;
    }
    const onReserveRemove = (reservationId) => {
        dispatch({
            type: 'RESVERREMOVE',
            reservationId
        })
    }

    const onSymptomAdd = (
        pet_id,
        date,
        cough,
        runningNose,
        hunger,
        urine,
        excrement,
        temperature,
        active,
        misc
    ) => {
        dispatch({
            type: "SYMPTOMADD",
            data: {
                pet_id,
                symptom_id: symptomId.current,
                symptom_date: new Date(date),
                cough,
                runningNose,
                hunger,
                urine,
                excrement,
                temperature,
                active,
                misc
            },
        });
        symptomId.current += 1;
    };

    const onSymptomRemove = (symptom_id) => {
        dispatch({
            type: 'SYMPTOMREMOVE',
            symptom_id
        })
    }

    const Layout = () => {
        return (
            <div className='wrap'>
                <Outlet />
                <BottomMenu />
            </div>
        )
    }

    return (
        <HospitalList.Provider value={hosData}>
            <AnimalList.Provider value={data}>
                <AnimalListDispatch.Provider value={{ onCreate, onRemove, onEdit, onReserveAdd, onReserveRemove, onSymptomAdd, onSymptomRemove }}>
                    {loading ? (<Loading />) : (
                        <div className="App">
                            <BrowserRouter>
                                <ScrollTop />
                                <Routes>
                                    <Route path='/' element={<Layout />}>
                                        <Route index element={<Home />} />
                                        <Route path='/hospital' element={<Hospital handleBookmarkClick={handleBookmarkClick} bookmarkedHos={bookmarkedHos} />} />
                                        <Route path='/Consult' element={<Consult />} />
                                        <Route path='/bookmark' element={<BookMark handleBookmarkClick={handleBookmarkClick} bookmarkedHos={bookmarkedHos} />} />
                                        <Route path='/hospitalInfo/:hos_id' element={<HospitalInfo />} />
                                        <Route path='/petpage/' element={<PetPage />} />
                                        <Route path='/petdetail/:pet_id' element={<PetDetail />} />
                                    </Route>
                                    <Route path='/search' element={<SearchPage />} />
                                    <Route path='/reservation/:hos_id' element={<Reservation />} />
                                    <Route path='/addpets' element={<AddPetPage />} />
                                    <Route path='/editpets/:pet_id' element={<EditPetPage />} />
                                </Routes>
                            </BrowserRouter>
                        </div>
                    )}
                </AnimalListDispatch.Provider>
            </AnimalList.Provider>
        </HospitalList.Provider>
    );
}


export default App;

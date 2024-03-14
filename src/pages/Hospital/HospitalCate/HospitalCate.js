import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Button from "../../../component/Button/Button";
import NaverMap from "../NaverMap/NaverMap";
import BookMarkStar from "../../BookMark/BookMarkStar/BookMarkStar";

const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
};//나와의 거리 계산하기

const toRadians = (degree) => {
    return degree * (Math.PI / 180);
};//나와의 거리 계산하기

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes}`;
};// 실시간 기준으로 영업중/영업종료 계산

const isHospitalOpen = (openTime, closeTime) => {
    const currentTime = getCurrentTime();
    return currentTime >= openTime && currentTime <= closeTime;
};// 실시간 기준으로 영업중/영업종료 계산


const HospitalCate = ({ filterSearch, isMap }) => {
    const navigate = useNavigate();
    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        // 사용자의 현재 위치를 가져오는 함수
        const fetchUserLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.error("현재 위치를 가져올 수 없습니다.", error.message);
                    }
                );
            } else {
                console.error("위치 정보를 지원하지 않는 브라우저입니다.");
            }
        };

        // 사용자의 현재 위치를 가져오기
        fetchUserLocation();
    }, []);

    const handleCall = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    }; // 전화하기 기능 


    if (isMap === true) {
        return (
            <div className="HospitalCateMap">
                <NaverMap filterSearch={filterSearch} userLocation={userLocation} />
            </div>
        )
    } else {
        return (
            <div className="HospitalCate">
                <ul>
                    {filterSearch && filterSearch.map((hospital) => (
                        <li className="EachHospital" key={hospital.hos_id}>
                            <div className="info">
                                <div className="title_fav">
                                    <p onClick={() => { navigate(`/hospitalInfo/${hospital.hos_id}`) }}>{hospital.hos_name}</p>
                                    <BookMarkStar id={hospital.hos_id} book={hospital.bookmark} />
                                </div>
                                <div className="place">
                                    <p className="far">
                                        {`${getDistance(
                                            userLocation.latitude,
                                            userLocation.longitude,
                                            hospital.latitude,
                                            hospital.longitude
                                        ).toFixed(2)}km`}
                                    </p>
                                    <span>|</span>
                                    <p className="address">{hospital.address}</p>
                                </div>
                                <div className="time">
                                    <div className={`noti ${isHospitalOpen(hospital.open_hours.open_time, hospital.open_hours.close_time)
                                        ? "open"
                                        : "closed"}`}>
                                        {isHospitalOpen(hospital.open_hours.open_time, hospital.open_hours.close_time)
                                            ? "영업중"
                                            : "영업종료"}
                                    </div>
                                    {
                                        hospital.open_hours ? (
                                            <p>
                                                {hospital.open_hours.open_time}
                                                ~
                                                {hospital.open_hours.close_time}
                                            </p>
                                        ) : (
                                            <p>영업 시간 정보가 없습니다.</p>
                                        )
                                    }

                                </div>
                                <p className="call_num">
                                    <span className="material-symbols-outlined">call</span>
                                    {hospital.call}
                                </p>
                                <div className="btn">
                                    <Button btnText={'전화하기'} btnClick={() => {
                                        handleCall(hospital.call);
                                    }} />
                                    <Button btnText={'예약하기'} btnClick={() => { navigate(`/hospitalInfo/${hospital.hos_id}`) }} />
                                </div>
                            </div>
                            <div className="photo" onClick={() => { navigate(`/hospitalInfo/${hospital.hos_id}`) }}>
                                <img src={hospital.hos_photo} alt="hospital_photo" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};
const MemoizedHospitalCate = React.memo(HospitalCate);
export default MemoizedHospitalCate;
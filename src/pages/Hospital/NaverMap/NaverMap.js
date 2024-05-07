import { useEffect, useState } from "react";
import MapItem from "./MapItem";

function NaverMap({ filterSearch, userLocation }) {

    const [selectedHospital, setSelectedHospital] = useState(null);

    useEffect(() => {
        //기본위치
        const map = new window.naver.maps.Map("map", {
            center: new window.naver.maps.LatLng(35.542, 129.33823),
            zoom: 15,
            scaleControl: false,
            logoControl: false,
            mapDataControl: false,
            zoomControl: true,
            minZoom: 6,
        });

        // 사용자 위치 마커 추가
        if (userLocation) {
            const userMarker = new window.naver.maps.Marker({
                map,
                position: new window.naver.maps.LatLng(
                    userLocation.latitude,
                    userLocation.longitude
                ),
                icon: {
                    content: `<div style="background-color : #1DAE51; width : 20px; height : 20px; border-radius : 50%; border : 5px solid #fff;"></div>`,
                },
            });

            // 사용자 위치 클릭 시 선택된 병원 초기화
            window.naver.maps.Event.addListener(userMarker, "click", () => {
                setSelectedHospital(null);
            });
        }

        filterSearch &&
            filterSearch.map((hospital) => {
                const position = new window.naver.maps.LatLng(
                    hospital.latitude,
                    hospital.longitude
                );
                const marker = new window.naver.maps.Marker({
                    map,
                    position,
                    icon: {
                        content: `<img src="/img/marker.png" alt="Custom Marker">`,
                        size: new window.naver.maps.Size(30, 30), // 마커 이미지 크기
                        anchor: new window.naver.maps.Point(15, 15), // 마커 이미지의 중심점
                    },
                });
                const infoWindow = new window.naver.maps.InfoWindow({
                    disableAnchor: true,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                });

                // 미커 클릭했을 때 정보창 열리게
                window.naver.maps.Event.addListener(marker, "click", () => {
                    infoWindow.open(map, marker);
                    setSelectedHospital(hospital);
                });

                //지도부분 클릭했을때 정보창닫히게
                window.naver.maps.Event.addListener(map, "click", () => {
                    infoWindow.close();
                    setSelectedHospital(null);
                });

            });
    }, [userLocation, filterSearch]);

    return (
        <div className="HospitalCateMapWrap">
            <div id="map"></div>
            {selectedHospital !== null && selectedHospital !== undefined && (
                <MapItem
                    hos_id={selectedHospital.hos_id}
                    hos_name={selectedHospital.hos_name}
                    address={selectedHospital.address}
                    call={selectedHospital.call}
                    open_time={selectedHospital.open_hours.open_time}
                    close_time={selectedHospital.open_hours.close_time}
                    hos_photo={selectedHospital.hos_photo}
                />
            )}
        </div>
    );
}
export default NaverMap;
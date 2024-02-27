import { useEffect, useState } from "react";
import MapItem from "./MapItem";

function NaverMap({ filterSearch }) {

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

                window.naver.maps.Event.addListener(marker, "click", (e) => {
                    infoWindow.open(map, marker);
                    setSelectedHospital(hospital);
                });

                window.naver.maps.Event.addListener(map, "click", function (e) {
                    infoWindow.close();
                    setSelectedHospital(null);
                });//지도부분 클릭했을때 정보창닫히게

            });
    }, [filterSearch]);

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
import { useContext } from "react";
import Slider from "react-slick";

import { AnimalListDispatch } from "../../../App";
import { AnimalList } from "../../../App";
import ReserveCard from "../ReserveCard/ReserveCard";
import Button from "../../../component/Button/Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReserveCardList = ({ setCardOpen }) => {
    const animalList = useContext(AnimalList);
    const { onReserveRemove } = useContext(AnimalListDispatch);
    const sliderSetting = {
        arrows: false,
        infinite: false
    }

    const handleCall = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    }; // 전화하기 기능 

    const handleReserDelete = (reservationId) => {
        const shouldDelete = window.confirm('예약을 취소하시겠습니까?');
        if (shouldDelete) {
            onReserveRemove(reservationId);
        }
    };

    return (
        <div className="ReserveCardList">
            <Slider {...sliderSetting}>
                {animalList
                    .filter((animal) => (!!animal.reservations?.length > 0))
                    .map((animal) => (
                        animal.reservations && animal.reservations
                            .map((reservationItem) => (
                                <div key={animal.pet_id} className="reserveItem">
                                    <div className="pet">
                                        <p className="photo"><img src={animal.pet_photo} alt="pet" /></p>
                                        <p className="name">{animal.pet_name}</p>
                                        <p className="pet_info">
                                            {animal.pet_breed}
                                            <span>|</span>
                                            {animal.pet_sex}
                                        </p>
                                    </div>
                                    <ReserveCard key={reservationItem.reserve_id} {...reservationItem} setCardOpen={setCardOpen} />
                                    <div className="button">
                                        <Button btnText={'전화하기'}
                                            btnClick={() => {
                                                handleCall(reservationItem.hospital_number);
                                            }}
                                            btnName={'call'}
                                        />
                                        <Button
                                            btnText={'예약취소'}
                                            btnClick={() => { handleReserDelete(reservationItem.reserve_id) }}
                                            btnName={'cancel'}
                                        />
                                    </div>
                                </div>
                            ))
                    ))
                }
            </Slider>
        </div>
    );
};

export default ReserveCardList;
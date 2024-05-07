import React, { useContext, useEffect, useState } from "react";
import { AnimalList } from "../../App";
import { useNavigate } from "react-router-dom";
import "./PetPage.css";
import Button from "../../component/Button/Button";
import PetDetail from "../PetPage/PetDetail/PetDetail";
import { AnimalListDispatch } from "../../App";
import styled from "styled-components";
import moment from "moment";
import Slider from "react-slick";

const PetPage = () => {
    const navigate = useNavigate();
    const petDummy = useContext(AnimalList);
    const { onReserveRemove } = useContext(AnimalListDispatch);
    const [choosePet, setChoosePet] = useState(null);
    const [isMyPet, setIsMyPet] = useState(true);

    const sliderSetting = {
        arrows: false,
        infinite: false,
        slidesToShow: 3.5,
        slidesToScroll: 1,
    }

    const changePage = () => {
        setIsMyPet(!isMyPet);
    }

    const clickPet = (id) => {
        setChoosePet(id);
    }
    //반려동물 삭제시 남은 동물 중 첫번째 동물을 보여주는 함수
    useEffect(() => {
        if (petDummy.length > 0 && !petDummy.find(pet => pet.pet_id === choosePet)) {
            setChoosePet(petDummy[0]?.pet_id);
        }
    }, [petDummy, choosePet]);

    const filterPetDummy = choosePet ? petDummy.filter((pet) => (pet.pet_id === choosePet)) : [];

    const handleReserDelete = (reservationId) => {
        const shouldDelete = window.confirm('예약을 취소하시겠습니까?');
        if (shouldDelete) {
            onReserveRemove(reservationId);
        }
    };

    if (isMyPet === true && choosePet !== null) {
        return (
            <div className="PetPage">
                <PetPageTop>
                    <div>
                        <Button
                            btnText={"내 반려동물"}
                            btnName={'mypet now'}
                        />
                        <Button
                            btnText={"예약내역"}
                            btnClick={() => {
                                changePage()
                            }}
                            btnName={'reser'}
                        />
                    </div>
                </PetPageTop>
                <Slider {...sliderSetting}>
                    {petDummy.map((btn) => (
                        <Button
                            btnImg={btn.pet_photo}
                            btnClick={() => clickPet(btn.pet_id)}
                            key={btn.pet_id}
                            btnName={`petImg ${btn.pet_id} ${choosePet === btn.pet_id ? 'selected' : ''}`}
                        />
                    ))}
                    <Button
                        btnName={"addPets"}
                        btnClick={() => navigate('/addpets')}
                        btnText={<span className="material-symbols-outlined">add</span>}
                    />
                </Slider>
                <div>
                    {filterPetDummy.map((pet) => (
                        <PetDetail
                            key={pet.pet_id} {...pet}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="MyReservation">
                <PetPageTop>
                    <div>
                        <Button
                            btnText={"내 반려동물"}
                            btnClick={() => {
                                changePage()
                            }}
                            btnName={'mypet'}
                        />
                        <Button
                            btnText={"예약내역"}
                            btnName={'reser now'}
                        />
                    </div>

                </PetPageTop>
                <ul>
                    {petDummy
                        .filter((animal) => (!!animal.reservations?.length > 0))
                        .map((animal) => (
                            animal.reservations
                                .map((reservation) => (
                                    <li {...reservation} key={reservation.reserve_id} className="eachReservation">
                                        <div className="txt">
                                            <div className="reservebtns">
                                                <p>방문예정</p>
                                                <Button
                                                    btnText={'예약취소하기'}
                                                    btnClick={() => { handleReserDelete(reservation.reserve_id) }}
                                                />
                                            </div>
                                            <div className="reservedate">
                                                <p>{moment(new Date(reservation.reserve_date)).format("YYYY년 MM월 DD일")}&nbsp;</p>
                                                <p>{reservation.reserve_time}</p>
                                            </div>
                                            <p className="hos_name">{reservation.hospital_name}</p>
                                            <p className="sub">방문목적: {reservation.reserve_purpose}</p>
                                            <p className="sub">증상: {reservation.symptom === '' ? '없음' : reservation.symptom}</p>
                                        </div>
                                        <div className="photo" key={animal.pet_id}>
                                            <p className="pet_photo">
                                                <img src={animal.pet_photo} alt="reservPetPhoto" />
                                            </p>
                                            <p>{animal.pet_name}</p>
                                        </div>
                                    </li>
                                ))
                        ))
                    }
                </ul>
            </div>
        )
    }
};
export default PetPage;

const PetPageTop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 60px 0 10px;
    background-color: #fff;
    z-index: 10;
    margin 0 auto;
    max-width: 768px;
    div{
        display: flex;
    }
    div > .btn{
        width: 50%;
        background-color: #fff;
        line-height: 45px;
        border-radius: 10px 10px 0 0;
        box-sizing: border-box;
        border-bottom: 1px solid #999;
        color: #999;
        font-size: 16px;
        font-weight: 600;
    }
    div > .mypet.now{
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        border-left: 1px solid #999;
        border-bottom: 0;
        color: #333;
    }
    div > .reser.now{
        border-top: 1px solid #999;
        border-left: 1px solid #999;
        border-right: 1px solid #999;
        border-bottom: 0;
        color: #333;
    }

`
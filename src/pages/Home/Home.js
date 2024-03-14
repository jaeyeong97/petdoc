import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../component/SearchBar/SearchBar";
import Button from "../../component/Button/Button";
import BottomMenu from "../../component/BottomMenu/BottomMenu";
import HomeFav from "./HomeFav/HomeFav"
import Mypet from "../PetPage/MyPet/Mypet";
import ReserveCardList from "./ReserveCardList/ReserveCardList";
import { AnimalList } from "../../App";
import './HomeButton/HomeButton.css'



const Home = () => {
    const navigate = useNavigate();
    const animalList = useContext(AnimalList);
    const [search, setSearch] = useState('');
    const [cardOpen, setCardOpen] = useState(false);

    const handleCard = () => {
        setCardOpen(true);
    }

    const totalReservations = animalList.reduce((total, animal) => {
        return total + (animal.reservations?.length || 0);
    }, 0);

    return (
        <div className="Home">
            <h1 className="logo">Petdoc</h1>
            <SearchBar
                searchName={'searchBar'}
                search={search}
                setSearch={setSearch}
                onClick={() => { navigate('/search') }}
            />
            <div className="homeBtns_wrap">
                <Button
                    btnText={'상담하기'}
                    btnName={'consultBtn'}
                    btnClick={() => { navigate('/consult') }}
                />
                <Button
                    btnText={'가까운병원'}
                    btnName={'nearHospitalBtn'}
                    btnClick={() => (navigate('/hospital'))}
                />
            </div>
            <div>
                <HomeFav />
            </div>
            <div>
                <Mypet />
            </div>
            {cardOpen && <ReserveCardList setCardOpen={setCardOpen} />}
            <div>
                {totalReservations > 0 &&
                    <Button
                        btnName={`checkReserve ${totalReservations === 0 ? 'hidden' : ''}`}
                        btnClick={() => handleCard()}
                        btnText={
                            <div style={cardOpen ? { display: 'none' } : { display: 'flex' }}>
                                <p>{`예약이 ${totalReservations}건 있습니다.`}</p>
                                <span className="material-symbols-outlined">keyboard_arrow_up</span>
                            </div>
                        }
                    />}
            </div>
            <BottomMenu />
        </div>
    );
};

export default Home;
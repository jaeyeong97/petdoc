import { useLocation, useNavigate } from 'react-router-dom';
import '../css/BottomMenu.css';
import { useEffect, useState } from 'react';

const BottomMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('');

    useEffect(() => {
        if (location.pathname === '/') {
            setActiveButton('home');
        } else if (location.pathname === '/hospital') {
            setActiveButton('hospital');
        } else if (location.pathname === '/consult') {
            setActiveButton('consult');
        } else if (location.pathname === '/petpage') {
            setActiveButton('petpage');
        }
    }, [location.pathname]);//url(location.pathname)이 바뀔때마다 실행

    const handleClick = (path, button) => {
        navigate(path);
        setActiveButton(button);
    };

    return (
        <div className="bottomMenu_wrap">
            <div className="BottomMenu">
                <div
                    className="homeBtn_wrap"
                    onClick={() => {handleClick('/','home')}}
                >
                    <span className={`material-symbols-outlined Btn_icon ${activeButton === 'home' ? 'active' : ''}`}>home</span>
                    <span className={`Btn_txt ${activeButton === 'home' ? 'active' : ''}`}>홈</span>
                </div>
                <div
                    className="hospitalBtn_wrap"
                    onClick={() => {handleClick('/hospital','hospital')}}
                >
                    <span className={`material-symbols-outlined Btn_icon ${activeButton === 'hospital' ? 'active' : ''}`}>local_hospital</span>
                    <span className={`Btn_txt ${activeButton === 'hospital' ? 'active' : ''}`}>동물병원</span>
                </div>
                <div
                    className="consultBtn_wrap"
                    onClick={() => {handleClick('/consult','consult')}}
                >
                    <span className={`material-symbols-outlined Btn_icon ${activeButton === 'consult' ? 'active' : ''}`}>mark_unread_chat_alt</span>
                    <span className={`Btn_txt ${activeButton === 'consult' ? 'active' : ''}`}>상담하기</span>
                </div>
                <div
                    className="mypageBtn_wrap"
                    onClick={() => {handleClick(`/petpage`,'petpage')}}
                >
                    <span className={`material-symbols-outlined Btn_icon ${activeButton === 'petpage' ? 'active' : ''}`}>account_circle</span>
                    <span className={`Btn_txt ${activeButton === 'petpage' ? 'active' : ''}`}>마이페이지</span>
                </div>
            </div>
        </div>
    );
};

export default BottomMenu;
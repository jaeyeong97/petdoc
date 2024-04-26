import React, { useState } from "react";
import './Chatting.css';
import { useNavigate } from "react-router-dom";


const Chatting = ({ chatHistory }) => {
    const navigate = useNavigate();
    const [openText, setOpenText] = useState([]);

    // 더보기 버튼 토글
    const toggleText = (index) => {
        setOpenText((prevText) => {
            const newText = [...prevText];
            newText[index] = !newText[index]; // true/false 토글
            return newText;
        });
    };

    return (
        <div className="Chatting">
            <div className="consultContent">
                {chatHistory.map((item, index) => (
                    <div className="content_wrap" key={index}>
                        <div
                            className={`content ${openText[index] ? 'expanded' : ''}`} >
                            {item.content}
                        </div>
                        <span
                            className='more'
                            onClick={() => { toggleText(index) }} >
                            {openText[index] ? '접기' : '더보기'}
                        </span>
                        <span
                            className="near"
                            onClick={() => { navigate('/hospital') }}>
                            나와 가까운 병원 안내
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chatting;
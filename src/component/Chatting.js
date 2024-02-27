import React, { useState } from "react";
import '../css/Chatting.css';
import { useNavigate } from "react-router-dom";

const Chatting = ({ chatHistory, cate }) => {
    const navigate = useNavigate();
    const [openText, setOpenText] = useState([]);

    const toggleText = (i) => {
        setOpenText((prevText) => {
            const newText = [...prevText];
            newText[i] = !newText[i];
            return newText;
        });
    };
    return (
        <div className="Chatting">
            <div className="consultContent">
                {chatHistory.map((item, index) => (
                    <div className="content_wrap" key={index}>
                        <span 
                            className={`content ${openText[index] ? 'expanded' : ''}`} >
                            {item.content}
                        </span>
                        <span 
                            className="more" 
                            onClick={() => {toggleText(index)}} >
                            {openText[index] ? '접기' : '더보기'}
                        </span>
                        <span 
                            className="near" 
                            onClick={() => {navigate('/hospital')}}>
                            나와 가까운 병원 안내
                        </span>
                    </div>
                ))}
                {cate}
            </div>
        </div>
    );
}

export default Chatting;
import { useNavigate } from 'react-router-dom';
import '../css/Mypet.css';
import Button from './Button';


const MypetItem = ({pet_name, pet_photo, pet_breed, pet_sex, pet_weight, pet_birth}) => {
    const navigate = useNavigate();

    const birth = new Date(pet_birth);
    const toDay = new Date();

    const age = toDay.getFullYear() - birth.getFullYear();

    return(
        <div className='MypetItem'>
            <li className="MypetItemList">
                <div className="MypetPhoto">
                    <img src={pet_photo}/>
                </div>
                <div className="MypetInfo">
                    <p>{pet_name}</p>
                    <p className='MypetInfo2'>{pet_breed}&nbsp;│&nbsp;{pet_sex}</p>
                    <p>{pet_weight}kg</p>
                    <p>{age}살<span className='birth'>({new Date(pet_birth).toLocaleDateString()})</span></p>
                    <Button
                    btnText = {<div>
                                <p>현재증상입력하기</p>
                                <span className='material-icons-outlined'>arrow_forward_ios</span>
                            </div>}
                    btnName={'goMyPage'}
                    btnClick={() => {navigate('/petpage')}}
                /> 
                </div>
            </li>
        </div>
    );
};

export default MypetItem;
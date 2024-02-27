import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimalList } from "../App";
import Button from './Button';
import MypetItem from './MypetItem';
import '../css/Mypet.css';


const Mypet = () => {
    const petList = useContext(AnimalList); 
    const navigate = useNavigate();
    return(
        <div className='MyPet'> 
            <div className='MypetTitle'>
                <h3>My Pet</h3>
                <Button 
                    btnText={<span className='material-icons-outlined'> add_circle</span>}
                    btnName={'goMypage'}
                    btnClick={()=>{navigate('/petpage')}}
                />
            </div>
            <ul>
                {petList.map((it) => 
                    <MypetItem key={it.pet_id} {...it} />
                )} 
            </ul>
        </div>
       
    );
};

export default Mypet
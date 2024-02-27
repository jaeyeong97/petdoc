import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import '../css/BookMarkItem.css';
import BookMarkStar from './BookMarkStar';

const BookMarkItem = ({ hos_id, hos_name, address, open_hours, bookmark }) => {
    const navigate = useNavigate();
    return (
        <div className="BookMarkItem">
            <div className='hos_txt'>
                <div className='hos_title_wrap'>
                    <span className='hos_title'>{hos_name}</span>
                    <BookMarkStar id={hos_id} book={bookmark}/>
                </div>
                <div className='hos_address'>{address}</div>
                <div className='hos_time'>
                    {open_hours.open_time}~{open_hours.close_time}
                </div>
            </div>
            <div className='btn_wrap'>
                <Button 
                    btnName={'BookMarkItemBtn'}
                    btnText={'전화하기'}
                    btnClick={() => {navigate('/')}}
                />
                <Button 
                   btnName={'BookMarkItemBtn'}
                   btnText={'예약하기'} 
                   btnClick={() => {navigate(`/reservation/${hos_id}`)}}
                />
            </div>
        </div>
    )
}
export default BookMarkItem;
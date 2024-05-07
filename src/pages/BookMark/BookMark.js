import "./BookMark.css";
import Button from "../../component/Button/Button";
import { useNavigate } from "react-router-dom";

const BookMark = ({ bookmarkedHos, handleBookmarkClick }) => {
    const navigate = useNavigate();
    return (
        <div className="BookMark">
            <h2 className="title">즐겨찾기</h2>
            <div className="BookMarkItemWrap">
                {bookmarkedHos.map((hos) => (
                    <div className="BookMarkItem" key={hos.hos_id}>
                        <div className='hos_txt'>
                            <div className='hos_title_wrap'>
                                <span className='hos_title'>{hos.hos_name}</span>
                                <button onClick={() => handleBookmarkClick(hos)}>
                                    {bookmarkedHos.some(item => item.hos_id === hos.hos_id) ? <div className="BookMarkStar">
                                        <span className='material-symbols-outlined star_icon true'>grade</span>
                                    </div> : <div className="BookMarkStar">
                                        <span className='material-symbols-outlined star_icon'>grade</span>
                                    </div>}
                                </button>
                            </div>
                            <div className='hos_address'>{hos.address}</div>
                            <div className='hos_time'>
                                {hos.open_hours.open_time}~{hos.open_hours.close_time}
                            </div>
                        </div>
                        <div className='btn_wrap'>
                            <Button
                                btnName={'BookMarkItemBtn'}
                                btnText={'전화하기'}
                                btnClick={() => { navigate('/') }}
                            />
                            <Button
                                btnName={'BookMarkItemBtn'}
                                btnText={'예약하기'}
                                btnClick={() => { navigate(`/reservation/${hos.hos_id}`) }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookMark;
import { useNavigate } from "react-router-dom";
import Button from "../../../component/Button/Button";
import BookMarkStar from "../../BookMark/BookMarkStar/BookMarkStar";

const MapItem = ({ hos_id, hos_name, address, call, open_time, close_time, hos_photo, bookmark }) => {
    const navigate = useNavigate();

    return (
        <div className='MapItem'>
            <div className="MapItem_wrap">
                <div className="text">
                    <div className="t_wrap">
                        <span className="title" onClick={() => { navigate(`/hospitalInfo/${hos_id}`) }}>{hos_name}
                        </span>
                        <span><BookMarkStar id={hos_id} book={bookmark} /></span>
                    </div>
                    <span className="address">{address}</span>
                    <div className="time">
                        <span className="open_time">{open_time}</span>~
                        <span className="close_time">{close_time}</span>
                    </div>
                    <span className="call">{call}</span>
                    <div className="btns_wrap">
                        <Button
                            btnName={'btn'}
                            btnText={'전화하기'}
                            btnClick={() => { navigate('/') }}
                        />
                        <Button
                            btnName={'btn'}
                            btnText={'예약하기'}
                            btnClick={() => { navigate(`/reservation/${hos_id}`) }}
                        />
                    </div>
                </div>
                <div className="hos_img">
                    <img src={hos_photo} alt="hospital_photo" />
                </div>
            </div>
        </div>
    )
}

export default MapItem;
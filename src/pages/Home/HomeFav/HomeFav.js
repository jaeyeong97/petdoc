import { useContext } from 'react'
import { HospitalList } from '../../../App'

import './HomeFav.css'
import HomeFavItem from '../HomeFavItem/HomeFavItem'
import { useNavigate } from 'react-router-dom'


const HomeFav = () => {

    const hospitalList = useContext(HospitalList)
    const navigate = useNavigate();

    return (
        <div className="HomeFav">
            <div className="favHeader">
                <h2 className="favTitle">
                    즐겨찾기한 병원
                </h2>
                <button className="btnMore" onClick={() => { navigate('/bookmark') }}>
                    <p>더보기</p>
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
            <div className="HomeFavIn">
                {hospitalList.filter((hospital) => (hospital.bookmark === true))
                    .slice(0, 2)
                    .map((item) => (
                        <HomeFavItem key={item.hos_id} {...item} />
                    ))}
            </div>
        </div>
    )
}
export default HomeFav
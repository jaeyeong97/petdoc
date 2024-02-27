import { useContext, useState, memo } from "react";
import { Favorite } from "../App";
import "../css/BookMarkItem.css";

const BookMarkStar = ({ id, book }) => {
    const { changeFav } = useContext(Favorite);
    const [favMark, setFavMark] = useState(book);

    const handleFav = () => {
        const updatedFavMark = !favMark;
        setFavMark(updatedFavMark);
        changeFav(id, updatedFavMark);
    }


    return (
        <button
            className="BookMarkStar"
            onClick={() => { handleFav() }}
        >
            <span
                className={favMark ? 'material-symbols-outlined star_icon true' : 'material-symbols-outlined star_icon'}
            >
                grade
            </span>
        </button>
    );
}
export default memo(BookMarkStar);
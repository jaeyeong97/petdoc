import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ search, searchRef, searchName, setSearch, onClick }) => {
    const navigate = useNavigate();

    return (
        <div className='searchBar_wrap'>
            <input
                type="text"
                id='search'
                value={search}
                ref={searchRef}
                className={searchName}
                placeholder="병원명을 입력해주세요."
                onClick={onClick}
                onChange={e => setSearch(e.target.value)}
            />
            <span className="material-symbols-outlined back_icon" onClick={() => { navigate(-1) }}>arrow_back</span>
            <span className="material-symbols-outlined searchBar_icon">search</span>
            <span className="material-symbols-outlined close_icon" onClick={() => { setSearch("") }}>close</span>
        </div>
    );
}
export default SearchBar;
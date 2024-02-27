import { useContext, useEffect, useRef, useState } from "react";
import { HospitalList } from "../App";
import SearchBar from "../component/SearchBar";
import BottomMenu from "../component/BottomMenu";
import SearchPageItem from "../component/SearchPageItem";

const SearchPage = () => {
    const hospitalList = useContext(HospitalList) //병원리스트

    const searchRef = useRef();
    const [search, setSearch] = useState('');

    const filterResult = () => {
        return search === '' ? [] : hospitalList.filter((it) => it.hos_name.toLowerCase().includes(search.toLowerCase()));//검색필터
    }
    useEffect(() => {
        searchRef.current.focus();
    }, []);//창 열릴시 검색창 자동 포커스

    return (
        <div className="SearchPage">
            <SearchBar
                searchName={'searchBar'}
                search={search}
                setSearch={setSearch}
                searchRef={searchRef}
            />
            <BottomMenu />
            {filterResult().map((it) => (<SearchPageItem {...it} key={it.hos_id} />))}
        </div>
    )
}

export default SearchPage;
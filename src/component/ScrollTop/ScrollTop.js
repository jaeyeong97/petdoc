import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    return null;
}

// 페이지 이동시 스크롤이 최상단으로 가게
import { useEffect, useCallback } from "react";
import { incrementPage, resetPage } from "./infiniteScrollSlice";
import { useDispatch, useSelector } from "react-redux";

export const InfiniteScroll = ({
    count,
    hasMore,
    page, 
    children
}) => {
    const paginatePage = useSelector(state => state.infiniteScroll[page].page);
    const dispatch = useDispatch();

    const handleScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        if ( 
            scrollHeight - (scrollTop + windowHeight) < 100 && 
            count - paginatePage * 50 >= 0 &&
            hasMore 
        ) {
            dispatch(incrementPage(page))
        } 
    }, [hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore]);

    useEffect(() => {
        return () => {
            dispatch(resetPage(page));
        }
    }, [])

    return children
}
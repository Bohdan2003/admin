export const setPageIfTableEnd = ({setPage, page, data, isFetching, isError}) => {
    const pageCount = 10;

    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    // console.log(scrollHeight - (scrollTop + windowHeight),
    //     scrollHeight - (scrollTop + windowHeight) < 100,  
    //     !isFetching,
    //     !isError,
    //     data.length != 0
    // );
    if (
        scrollHeight - (scrollTop + windowHeight) < 100 && 
        !isFetching &&
        !isError &&
        data.count - page * pageCount <= 10 
    ) {       
        setPage(value => value + 1);
    }
};

export const convertDate = (originalDate, delimiter = '-') => {
    let year = originalDate.getFullYear();
    let month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    let day = originalDate.getDate().toString().padStart(2, '0');

    return `${year}${delimiter}${month}${delimiter}${day}`;
}

export const ConverIntoIntNumber = (str) => {
    return +str.replace(/[^\d]/g, '');
}

export const ConverIntoFloatNumber = (str) => {
    return str.replace(/[^\d.]|(?<=\..*)\./g, '');
}

export const setFiltersForRequest = (payload) => {
    let filters = '';
    if(!payload) return filters;
    
    if( payload.search !== '' ) filters += `search=${payload.search}&`;
    if( payload.category && typeof payload.category == 'number' ) {
        filters += `first_level_filters=${payload.category}&`;
    }
    if( payload.subcategory && typeof payload.category == 'number' ) {
        filters += `category=${payload.subcategory}&`;
    }
    
    if(payload.tegs.length > 0) {
        let tegs = []
        let index = 0;        
        for(let item of payload.tegs){
            if(item?.length == 0 || item == null) continue;
            tegs[index] = [];
    
            item.forEach(item => {
                if( item?.name ) tegs[index].push(item.name)       
            })
            index++;
        }
        if(tegs.length > 0) filters += `tegs=${JSON.stringify(tegs)}`;
    }

    return filters;
}

export const hiddenScroll = () => {
    const root = document.querySelector('#root');
    root.style.overflow = "hidden";
    root.style.height = "100vh";
}

export const showScroll = () => {
    const root = document.querySelector('#root');

    root.style.overflow = "visible";
    root.style.height = "auto";
}
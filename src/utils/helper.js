export const hiddenScroll = () => {
    const body = document.body;
    const scrollWidth = window.innerWidth - body.offsetWidth;
    if(scrollWidth > 0){
        body.style.overflow = "hidden";
        body.style.paddingRight = `${scrollWidth}px`;
    }

}

export const showScroll = () => {
    const body = document.body;

    body.style.overflow = "auto";
    body.style.paddingRight = "0px";
}
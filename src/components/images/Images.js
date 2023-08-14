import { Img } from "../img/Img";

import "./images.scss";

export const Images = ({img1, img2, img3, noHiddenScroll}) => {

    if(!img1 && !img2 && !img3) return;

    return (
        <div className="images">
            <Img src={img1} noHiddenScroll={noHiddenScroll}/>
            <Img src={img2} noHiddenScroll={noHiddenScroll}/>
            <Img src={img3} noHiddenScroll={noHiddenScroll}/> 
        </div>
    )
}
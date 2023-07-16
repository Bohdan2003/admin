import { useRef } from "react";
import { showScroll, hiddenScroll } from "../../utils/helper";

import "./img.scss"

export const Img = ({src}) => {

    const imgWrapperRef = useRef();

    if(!src) return ;

    return (
        <div className="img">     
            <img className="img__small" 
                    src={src}
                    onClick={() => {
                        imgWrapperRef.current.classList.add("img__big--visible")
                        hiddenScroll();
                    }}
            />  
            <div className="img__big" 
                ref={imgWrapperRef}
                onClick={e => {
                    if(e.target.classList.contains('img__big')) {
                        e.target.classList.remove("img__big--visible")
                        showScroll()
                    } 
                }}
            >
                <img src={src}/>
            </div>
        </div>
    )
}
import { createPortal } from "react-dom";
import { useRef } from "react";
import { showScroll, hiddenScroll } from "../../utils/helper";

import "./img.scss"

const Portal = (props) => {
    const node = document.createElement('div');
    document.body.append(node);

    return createPortal(props.children, node);
}

const FullscreenImg = ({imgWrapperRef, src, noHiddenScroll}) => {
    return (
        <div 
            className="img__big" 
            ref={imgWrapperRef}
            onClick={e => {
                if(e.target.classList.contains('img__big')) {
                    e.target.classList.remove("img__big--visible")
                    console.log(noHiddenScroll);
                    if(!noHiddenScroll){
                        showScroll()
                    }
                } 
            }}
        >
            <img src={src}/>
        </div>
    )
}

export const Img = ({src, noHiddenScroll=false}) => {

    const imgWrapperRef = useRef();

    if(!src) return ;

    return (
        <div className="img">     
            <img className="img__small" 
                    src={src}
                    onClick={() => {
                        imgWrapperRef.current.classList.add("img__big--visible")
                        if(!noHiddenScroll){
                            hiddenScroll();
                        }
                    }}
            />
            <Portal>            
                <FullscreenImg 
                    imgWrapperRef={imgWrapperRef} 
                    src={src}
                    noHiddenScroll={noHiddenScroll}
                />
            </Portal>  
        </div>
    )
}
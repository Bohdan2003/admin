import { memo, useRef, useEffect } from "react";

import img from "../../assets/img-bg.png"

export const PreviewImage = memo(({ file, selectingFile, clearField, nameClass = "", SUPPORTED_FORMATS, defaultImg }) => {
    // console.log('render preview image');
    if(!defaultImg) defaultImg = img
    const imgRef = useRef();
    
    useEffect(() => {
        if(SUPPORTED_FORMATS.includes(file?.type)){
            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    imgRef.current.setAttribute('src', reader.result);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            imgRef.current.setAttribute('src', defaultImg);
        }
    }, [file])
    
    return (
        <div 
            className={`${nameClass} ${file ? nameClass+'--active' : ''}`} 
            onClick={() => {
                if(file){
                    clearField();
                } else {
                    selectingFile();
                }
            }}
        >
            <img 
                ref={imgRef} 
                src={defaultImg}
                alt="preview"
            />
        </div>
    )
})
import { useRef, useCallback } from 'react';

import { PreviewImage } from '../previewImage/PreviewImage';

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const InputImage = ({nameClass, values, setFieldValue, fieldName, defaultImg}) => {
    let file = values[fieldName];
    const inputFileRef = useRef(null);

    if( typeof file == "string") file = null;

    const selectingFile = useCallback(() => {
        inputFileRef.current?.click();
    }, [inputFileRef.current]);

    return (
        <div className="input-image">
            <PreviewImage 
                nameClass={nameClass}
                file={file}
                selectingFile={selectingFile}
                clearField={() => {
                    inputFileRef.current.value = null;
                    setFieldValue(fieldName, null)
                }}
                SUPPORTED_FORMATS={SUPPORTED_FORMATS}
                defaultImg={defaultImg}
            />
            <input 
                // className='input-image__input'
                ref={inputFileRef}
                // value={values[fieldName]}
                hidden
                type="file" 
                accept={SUPPORTED_FORMATS}
                onChange={(e) => {
                    if(e.target.files[0]) setFieldValue(fieldName, e.target.files[0])                               
                }}
            />
        </div>
    )
}
import { Img } from "./Img"

export const Images = ({img1, img2, img3}) => {

    if(!img1 && !img2 && !img3) return ;

    return (
        <div className="images">
            <Img src={img1}/>
            <Img src={img2}/>
            <Img src={img3}/> 
        </div>
    )
}
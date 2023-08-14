import { useRef } from 'react';
import { useGetCurrencyQuery } from '../../api';

import { Loading } from "../loading/Loading";
import { Error } from "../error/Error"

import "./currencySelect.scss"; 

export const CurrencySelect = ({option, setOption}) => {
  const { data = [], isLoading, isError, error } = useGetCurrencyQuery();
  const refList = useRef(null);
  const refTitle = useRef(null);

  const ShowList = () => {
    refTitle.current.classList.toggle("currency-select__title--active");
    refList.current.classList.toggle("currency-select__list--hidden");
    refList.current.parentNode.classList.toggle("currency-select__box--disable");    
  };

  if(isLoading) return <Loading/>
  if(isError) return <Error error={error}/>
  
  return (
    <div className="currency-select">
      <div 
        ref={refTitle}
        className="currency-select__title"
        onClick={ShowList}
        >{option}</div>
      <div className="currency-select__box">
        <ul className="currency-select__list currency-select__list--hidden" ref={refList}>
        {
          data.map(({name}, i) => {
            return (
              <li 
                className={`currency-select__item 
                            ${name == option ? 'currency-select__item--active' : ''}`} 
                key={i}
                onClick={()=>{
                    setOption(name);
                    ShowList();
                }}>
                {name}
              </li>
            )           
          })
        }       
      </ul>
      </div>
      
    </div>
  );
}
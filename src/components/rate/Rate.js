import { useState } from "react";
import { 
    useGetCurrencyQuery, 
    useCreateCurrencyMutation,
    useEditCurrencyMutation
    // useDeleteCurrencyMutation 
} from "../../api";

import { RateForm } from "../rateForm/RateForm";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";

import "./rate.scss";

const RateItem = ({props}) => {
    const fetchProps = useEditCurrencyMutation();
    // const deleteProps = useDeleteCurrencyMutation();
    
    return <RateForm 
                fetchProps={fetchProps} 
                props={props} 
                // deleteProps={deleteProps}
            />
}

const RateAddItem = () => {
    const fetchProps = useCreateCurrencyMutation();
    const [ visibleForm, setVisibleForm ] = useState(false);

    if(!visibleForm) return (
        <button className="rate__btn-add"
                onClick={() => {
                    setVisibleForm(true);
                }}
        >
            <PlusIcon/>
        </button>
    )
    
    return (
        <RateForm fetchProps={fetchProps} 
                    props={{
                        name: '',
                        price_in_ua: '',
                        symbol: ''
                    }}
                    cancel={() => {
                        setVisibleForm(false);
                    }}
        />
    )
}

export const Rate = () => {
    const { data, isLoading, isError, error } = useGetCurrencyQuery();

    if(isLoading) return <Loading/>
    if(isError) return <Error error={error}/>

    return (
        <section className="rate">
            <ul className="rate__list">
                {
                    data.map(item => (
                        <li className="rate__item" key={item.id}>
                            <RateItem props={item}/>
                        </li>
                    ))
                }
            </ul>
            <RateAddItem/>
        </section>
    )
}
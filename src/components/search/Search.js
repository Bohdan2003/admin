import "./search.scss";

export const Search = ({placeholder, disabled = false, value, setValue}) => {
    return (
        <div className="search">
            <input 
                className="search__input" 
                type="text" 
                placeholder={placeholder}
                value={value}
                onChange={e => {
                    if(!disabled) {
                        setValue(e.target.value);
                    }                                     
                }}
            />
        </div>
    )
}
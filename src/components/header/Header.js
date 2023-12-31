import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setActiveSection } from './headerSlice';
import { removeSession } from '../pages/loginSlice';
import { clearFilters } from '../filters/filtersSlice';

import { ReactComponent as StoreIcon } from "../../assets/store.svg";
import { ReactComponent as StockIcon } from "../../assets/stock.svg";
import { ReactComponent as ReportIcon } from "../../assets/report.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";

import "./header.scss";

const MenuItem = ({nameSection, Component}) => { 
    const dispatch = useDispatch();
    const activeSection = useSelector((state) => state.header.activeSection);

    return (
        <li className="menu__item">
            <button 
                className={`menu__btn ${nameSection == activeSection ? 'menu__btn--active' : ''}`}
                onClick={() => {dispatch(setActiveSection(nameSection))}}>
                {Component}
            </button>
        </li>
    )
};

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = useSelector((state) => state.login.role);

    return (
        <header className="header">
            <nav className="menu">
                <ul className="menu__list">
                    <MenuItem nameSection="store" Component={<StoreIcon/>}/>
                    {
                        role == 'admin' &&
                        <>
                            <MenuItem nameSection="stock" Component={<StockIcon/>}/>
                            <MenuItem nameSection="report" Component={<ReportIcon/>}/>
                        </>
                    }
                </ul>
            </nav>
            <button className="header__btn"
                    onClick={() => {
                        dispatch(removeSession());
                        dispatch(clearFilters({page: "store"}));
                        dispatch(clearFilters({page: "stock"}));
                        navigate("/login");
                    }}
            ><LogoutIcon/></button>
        </header>
    )
}
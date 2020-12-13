import React from 'react';
import "./Header.css"
import Logo from "./robinhood.svg";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

function Header() {
    return (
        <div className="header">
            <div className="header__logo">
                <img src={Logo}/>
            </div>
                
            <div className="header__search">
                <div className="header__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search" type="text"/>
                </div>
            </div>
            <div className="header__menuItems">
                <a href="/">Free Stocks</a>
                <a href="/">PortFolio</a>
                <a href="/">Cash</a>
                <a href="/">Messages</a>
                <a href="/">Account</a>
            </div>
        </div>
    )
}

export default Header;

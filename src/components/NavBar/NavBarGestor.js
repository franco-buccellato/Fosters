import './NavBar.css';
import { useLocation } from 'react-router-dom';
import NavBarDesk from './NavBarDesk';
import NavBarMobile from './NavBarMobile';
import { useEffect } from 'react';

function NavBarGestor() {

    let screenWidth = document.documentElement.scrollWidth;

    let estoyEnSubPage = useLocation();

    useEffect(
        () => {
        },
        [estoyEnSubPage]
    )

    if(screenWidth > 800) {
        return <NavBarDesk estaEnSupPage={estoyEnSubPage.pathname}/>
    } else {
        return <NavBarMobile estaEnSupPage={estoyEnSubPage.pathname}/>
    }
}

export default NavBarGestor;
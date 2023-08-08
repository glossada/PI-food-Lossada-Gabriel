import React from "react";
import {HOME,ABOUT,FORM} from '../../Utils/ROUTES'
import { Link, useLocation} from 'react-router-dom';
import style from "./NavBar.module.css";

export default function Nav(props){

    if(useLocation().pathname==='/'){
        return null;
    }

    return(
        <div className={style.container}>
            <div className={style.title}>
            <h1>Enjoy!</h1>
            </div>
            <div className={style.navItems}>
        <Link className={style.link} to={HOME}>Home</Link>
        <Link className={style.link} to={FORM}>Create</Link>
        <Link className={style.link} to={ABOUT}>About</Link>
            </div>
      </div>

    );
}
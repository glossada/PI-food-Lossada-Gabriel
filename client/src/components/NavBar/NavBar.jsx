import React from "react";
import {HOME,ABOUT,FORM} from '../../Utils/ROUTES'
import { Link, useLocation} from 'react-router-dom';

export default function Nav(props){

    if(useLocation().pathname==='/'){
        return null;
    }

    return(
        <div >
            <div >
        <Link  to={HOME}>Home</Link>
        <Link  to={FORM}>Form</Link>
        <Link  to={ABOUT}>About</Link>
            </div>
      </div>

    );
}
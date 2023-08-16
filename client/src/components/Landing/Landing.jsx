import React from "react";
import style from "./Landing.module.css";
import { Link } from 'react-router-dom';
import { HOME } from "../../Utils/ROUTES";
import logo from '../../components/img/logo 3.jpg'

const Landing = (props) =>{


    

    return (
        <div className={style.container}>
          <div className={style.text}>
          <img className={style.logo} src={logo} alt="logo" />
            <div>
            <h1>Welcome to FoodieFaves!</h1>
            </div>
            <div>
            <Link className={style.link} to={HOME}>
            <h1 >Jump In!</h1>
            </Link>
            </div>
          </div>

        </div>
      );
}

export default Landing;
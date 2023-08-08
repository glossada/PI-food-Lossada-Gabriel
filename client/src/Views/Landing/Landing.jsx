import React from "react";
import style from "./Landing.module.css";
import { Link } from 'react-router-dom';
import { HOME } from "../../Utils/ROUTES";
import {useDispatch} from 'react-redux';
import {getRecipes,getDiets} from '../../redux/actions';

const Landing = (props) =>{
  const dispatch = useDispatch();


    

    return (
        <div className={style.container}>
          <div className={style.text}>
            <div>
            <h1>Welcome to Food App!</h1>
            </div>
            <div>
            <Link to={HOME}>
            <h1 >Jump In!</h1>
            </Link>
            </div>
          </div>

        </div>
      );
}

export default Landing;
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
            <div>
            <h1>Super FOOD APP for dumb people</h1>
            </div>
            <div>
            <Link to={HOME}>
            <h1 >JUMP IN!</h1>
            </Link>
            </div>

        </div>
      );
}

export default Landing;
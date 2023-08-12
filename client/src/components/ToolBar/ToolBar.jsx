import React from "react";
import style from "./ToolBar.module.css"
import { useState, useSelector } from "react";
import SearchBar from "../SearchBar/SearchBar";


export default function ToolBar(props) {
  
   return (
      <div>
         <div className={style.containerSearchbar}>
          <div className={style.searchbar}>
            <div className={style.order}>
            <button className={style.sortButton} onClick={props.sortRecipesByName}>Sort {props.ascendingName ? 'Z-A' : 'A-Z'}</button>
            <button className={style.sortButton} onClick={props.sortRecipesByHealthScore}>Sort {props.ascendingHealth ? '0-100' : '100-0'}</button>
            </div>
      <div className={style.filter}>
      <label >Select diet:</label>
      <select className={style.select} onChange={props.filterRecipes}>
        <option value="TD">All diets</option>
        {props.dietsSel.map((diet) => (
          <option key={diet.id} value={diet.name}>
            {diet.name}
          </option>
        ))}
      </select>
      </div>
      <div className={style.filter}>
      <label >Select Source:</label>
      <select className={style.select} onChange={props.filterBySource}>
        <option value="ALL">All</option>
        <option value="API">Api</option>
        <option value="BD">Data base</option>

      </select>
      </div>
      <div className={style.search}>
      <SearchBar searchByName={props.searchByName}/>
      </div>
          </div>
        </div>
      </div>
   );
}
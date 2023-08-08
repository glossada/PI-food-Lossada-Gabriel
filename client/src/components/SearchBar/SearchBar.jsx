import React from "react";
import style from "./SearchBar.module.css"
import { useState } from "react";

export default function SearchBar(props) {
   const [name, setName]=useState("");

   const handleChange = (event) =>{
      setName(event.target.value);
   }

   return (
      <div className={style.container}>
         <h4>Search by title:</h4>
         <input className={style.searchField} type='search'  onChange={handleChange} value={name}/>
         <button className={style.searchButton}  onClick={()=>{props.searchByName(name)}}>Search</button>
      </div>
   );
}
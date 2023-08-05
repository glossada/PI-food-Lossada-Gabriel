import React from "react";
import style from "./SearchBar.module.css"
import { useState } from "react";

export default function SearchBar(props) {
   const [name, setName]=useState("");

   const handleChange = (event) =>{
      setName(event.target.value);
   }

   return (
      <div >
         <input  type='search'  onChange={handleChange} value={name}/>
         <button  onClick={()=>{props.searchByName(name)}}>Search</button>
      </div>
   );
}
import React from "react";
import style from "./SearchBar.module.css"
import { useState } from "react";

export default function SearchBar(props) {
   const [id, setId]=useState("");

   const handleChange = (event) =>{
      setId(event.target.value);
   }

   return (
      <div >
         <input  type='search'  onChange={handleChange} value={id}/>
         <button  onClick={()=>{props.onSearch(id)}}>Add</button>
      </div>
   );
}
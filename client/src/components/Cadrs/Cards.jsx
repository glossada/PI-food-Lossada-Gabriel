import React from "react";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Card from '../Card/Card'
import { ITEMS_PER_PAGE } from "../../Utils/URL";
import {getRecipes,getDiets,getRecipesByName} from '../../redux/actions';
import SearchBar from "../SearchBar/SearchBar";
import style from "./Cards.module.css";

const Cards = (props) =>{
let recipes=useSelector((state)=> state.recipes);
let diets = useSelector((state)=> state.diets);
let recipesByName = useSelector((state)=> state.recipesByName);
const dispatch = useDispatch();

const [recipesMod, setRecipesMod]=useState([]);
const [dietsSel,setDietsSel]=useState([]);
const [items, setItems] = useState([]);
const [currentPage, setCurrentPage]=useState(0);
const [ascendingName, setAscendingName]=useState(true);
const [ascendingHealth, setAscendingHealth]=useState(true);


const nextHandler=()=>{
const totalElements= recipesMod.length;
const nextPage= currentPage +1;
const firstIndex= nextPage * ITEMS_PER_PAGE;

if(firstIndex>=totalElements)return;

setItems([...recipesMod].splice(firstIndex,ITEMS_PER_PAGE));
setCurrentPage(nextPage);
}

const prevHandler=()=>{
const prevPage = currentPage - 1;
if(prevPage<0)return
const firstIndex= prevPage * ITEMS_PER_PAGE;

setItems([...recipesMod].splice(firstIndex,ITEMS_PER_PAGE));
setCurrentPage(prevPage);
}

useEffect(()=>{
    dispatch(getRecipes());
    dispatch(getDiets());
},[]);

useEffect(() => {
    setRecipesMod(recipes)
  }, [recipes]);

  useEffect(() => {
    setDietsSel(diets)
  }, [diets]);

  useEffect(()=>{
    setItems([...recipesMod].splice(0, ITEMS_PER_PAGE));
  },[recipesMod])

  useEffect(() => {
    if (recipesByName.length > 0) {
      setRecipesMod([...recipesByName]);
      setCurrentPage(0);
    }
  }, [recipesByName]);

  // Si recipes aún no se ha cargado, puedes mostrar un mensaje de carga
  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  

  const sortRecipesByName=()=>{
   let recipesOrder = [...recipesMod].sort((a, b) => {
    const nameA = a.title.toLowerCase();
    const nameB = b.title.toLowerCase();
    if (ascendingName) {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });
  setRecipesMod([...recipesOrder])
  setItems([...recipesMod].splice(0, ITEMS_PER_PAGE));
  setCurrentPage(0);
  setAscendingName((prevOrder) => !prevOrder)
  }

  const sortRecipesByHealthScore = () => {
    let recipesOrder = [...recipesMod].sort((a, b) => {
      if (ascendingHealth) {
        return a.healthScore - b.healthScore;
      } else {
        return b.healthScore - a.healthScore;
      }
    });
    setRecipesMod([...recipesOrder]);
    setCurrentPage(0);
    setAscendingHealth((prevOrder) => !prevOrder);
  };

  const filterRecipes =(e)=>{
    const diet=e.target.value;
    let recipeCopy=recipes;
    if(diet==='TD'){
      setRecipesMod([...recipeCopy]);
    setCurrentPage(0);
    }else{
    let recipesFiltered=[];
    for (let i = 0; i < recipeCopy.length; i++) {
      for (let j = 0; j < recipeCopy[i].diets.length; j++) {
        if(recipeCopy[i].diets[j]===diet){
          recipesFiltered.push(recipeCopy[i]);
        }
        
      }
      
    }
    setRecipesMod([...recipesFiltered]);
    setCurrentPage(0);
   }
  }

  const searchByName = (name)=>{
    if(name.length===0){
      setRecipesMod([...recipes]);
    }else{
    dispatch(getRecipesByName(name));
    }
  }

    return (
        <div >
        <div className={style.containerSearchbar}>
          <div className={style.searchbar}>
            <div className={style.order}>
            <button className={style.sortButton} onClick={sortRecipesByName}>Sort {ascendingName ? 'Z-A' : 'A-Z'}</button>
            <button className={style.sortButton} onClick={sortRecipesByHealthScore}>Sort {ascendingHealth ? '0-100' : '100-0'}</button>
            </div>
      <div className={style.filter}>
      <label >Select diet:</label>
      <select className={style.select} onChange={filterRecipes}>
        <option value="TD">All diets</option>
        {dietsSel.map((diet) => (
          <option key={diet.id} value={diet.name}>
            {diet.name}
          </option>
        ))}
      </select>
      </div>
      <div className={style.search}>
      <SearchBar searchByName={searchByName}/>
      </div>
          </div>
        </div>
            <div>
            </div>
            <div className={style.data}>
                {items.map(recipe => {
                    return <Card key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    healthScore={recipe.healthScore}
                    image={recipe.image}
                    diets={recipe.diets}
                    />
                })}
            </div>
            <div className={style.containerFooter}>
            <div className={style.footer}>
            <button className={style.sortPage} onClick={prevHandler}>{'<-Prev'}</button>
            <p>Page {currentPage}</p>
            <button className={style.sortPage} onClick={nextHandler}>{'Next->'}</button>
            </div>
            </div>
        </div>
      );
}

export default Cards;
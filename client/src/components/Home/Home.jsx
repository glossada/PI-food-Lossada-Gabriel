import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { ITEMS_PER_PAGE } from "../../Utils/URL";
import { getRecipes, getDiets, getRecipesByName } from "../../redux/actions";
import style from "./Home.module.css";
import ToolBar from "../ToolBar/ToolBar";
import loadingGif from '../img/ee1d081c5bdf966b058c1a6588e73e8a.gif'

const Cards = (props) => {
  let recipes = useSelector((state) => state.recipes);
  let diets = useSelector((state) => state.diets);
  let recipesByName = useSelector((state) => state.recipesByName);
  const dispatch = useDispatch();

  const [recipesMod, setRecipesMod] = useState([]);
  const [dietsSel, setDietsSel] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [ascendingName, setAscendingName] = useState(true);
  const [ascendingHealth, setAscendingHealth] = useState(true);

  const nextHandler = () => {
    const totalElements = recipesMod.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * ITEMS_PER_PAGE;

    if (firstIndex >= totalElements) return;

    setItems([...recipesMod].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * ITEMS_PER_PAGE;

    setItems([...recipesMod].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(prevPage);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  useEffect(() => {
    setRecipesMod(recipes);
  }, [recipes]);

  useEffect(() => {
    setDietsSel(diets);
  }, [diets]);

  useEffect(() => {
    setItems([...recipesMod].splice(0, ITEMS_PER_PAGE));
  }, [recipesMod]);

  useEffect(() => {
    if (recipesByName.length > 0) {
      setRecipesMod([...recipesByName]);
      setCurrentPage(0);
    }
  }, [recipesByName]);

  if (recipes.length === 0) {
    return <div>
       <img className={style.loadinGif} src={loadingGif} alt="Cargando..." />
       <h2>Cargando...</h2>
    </div>;
  }

  const sortRecipesByName = () => {
    let recipesOrder = [...recipesMod].sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      if (ascendingName) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setRecipesMod([...recipesOrder]);
    setItems([...recipesMod].splice(0, ITEMS_PER_PAGE));
    setCurrentPage(0);
    setAscendingName((prevOrder) => !prevOrder);
  };

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

  const filterRecipes = (e) => {
    const diet = e.target.value;
    let recipeCopy = recipes;
    if (diet === "TD") {
      setRecipesMod([...recipeCopy]);
      setCurrentPage(0);
    } else {
      let recipesFiltered = [];
      for (let i = 0; i < recipeCopy.length; i++) {
        for (let j = 0; j < recipeCopy[i].diets.length; j++) {
          if (recipeCopy[i].diets[j] === diet) {
            recipesFiltered.push(recipeCopy[i]);
          }
        }
      }
      setRecipesMod([...recipesFiltered]);
      setCurrentPage(0);
    }
  };

  const searchByName = (name) => {
    if (name.length === 0) {
      setRecipesMod([...recipes]);
    } else {
      dispatch(getRecipesByName(name));
    }
  };

  const filterBySource=(e)=>{
    const source= e.target.value;
    let recipesApi=[];
    let recipesBD=[];

    if(source==='ALL'){
      setRecipesMod([...recipes]);
      return
    }

    for (let i = 0; i < recipes.length; i++) {
      if(Number.isInteger(recipes[i].id)){
        recipesApi.push(recipes[i]);
      }else{
        recipesBD.push(recipes[i]);
      }
    }

    if(source==='BD'){
      setRecipesMod([...recipesBD]);
      setCurrentPage(0);
    }

    if(source==='API'){
      setRecipesMod([...recipesApi]);
      setCurrentPage(0);
    }
  }

  return (
    <div>
      <ToolBar
        sortRecipesByName={sortRecipesByName}
        sortRecipesByHealthScore={sortRecipesByHealthScore}
        filterRecipes={filterRecipes}
        searchByName={searchByName}
        filterBySource={filterBySource}
        ascendingName={ascendingName}
        ascendingHealth={ascendingHealth}
        dietsSel={dietsSel}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        currentPage={currentPage}
      />
      <div></div>
      <div className={style.data}>
        {items.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              healthScore={recipe.healthScore}
              image={recipe.image}
              diets={recipe.diets}
            />
          );
        })}
      </div>
      <div className={style.containerFooter}>
        <div className={style.footer}>
          <button className={style.sortPage} onClick={prevHandler}>
            {"<-Prev"}
          </button>
          <p>Page {currentPage}</p>
          <button className={style.sortPage} onClick={nextHandler}>
            {"Next->"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;

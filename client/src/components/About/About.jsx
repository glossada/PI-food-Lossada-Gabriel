import React from "react";
import style from "./About.module.css";
import logo from '../img/logo 3.jpg'


const Landing = (props) =>{


    

    return (
        <div className={style.container}>
            <div className={style.innerCon}>
            <div className={style.box}>
            <img className={style.logo} src={logo} alt="logo" />
          <h1 className={style.title}>Foodie Favs!</h1>
          <div className={style.summaryCon}>
          <div className={style.summary}>
          <p>
          Indulge your taste buds and embark on a culinary adventure with our ultimate food recipes website! 🍔🍰 Whether you're a seasoned chef or a kitchen newbie, we've got you covered with a smorgasbord of mouthwatering recipes that span the entire gastronomic spectrum.
          </p>
          <p>
          Get ready to dive into a world of flavors, as we bring you step-by-step guides to whip up delectable dishes that range from the classic to the experimental. From sizzling stir-fries to decadent desserts, we've gathered a treasure trove of recipes that will tickle your palate and satisfy your cravings.
          </p>
          <p>
          But that's not all – we're all about catering to your unique lifestyle. With our nifty diet filter, you can easily navigate through recipes that align with your chosen dietary path. Whether you're a health-conscious vegan, a protein-loving carnivore, or anything in between, our recipes can be tailored to your preferences.
          </p>
          <p>
          Feeling adventurous in the kitchen? Unleash your inner chef and join our vibrant community by sharing your very own culinary creations! Craft your recipe, sprinkle in a dash of creativity, and watch as fellow food enthusiasts shower you with appreciation and maybe even some new cooking tips.
          </p>
          <p>
          So, whether you're cooking up a storm for a family feast or experimenting solo in the kitchen, our food recipes website is your go-to hub for all things delicious and delightful. Prepare to tantalize your taste buds, expand your culinary horizons, and have an absolute blast while doing it – because cooking is not just about feeding the body, it's about feeding the soul. Welcome to a world where flavors know no bounds and the kitchen is your playground! 🍳🎉
          </p>
          </div>
          </div>
</div>
</div>
        </div>
      );
}

export default Landing;
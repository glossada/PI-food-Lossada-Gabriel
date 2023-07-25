import './App.css';
import { useState, useEffect  } from 'react';
import axios from 'axios';
import {Routes,Route,Navigate,useNavigate,} from 'react-router-dom';
import Landing from './Views/Landing/Landing.jsx';
import Cards from './components/Cadrs/Cards.jsx';
import { RECIPES,DIETS } from './Utils/URL';




function App() {

const navigate = useNavigate();
const [recipes, setRecipes] = useState([]);
const [access, setAccess] = useState(false);

const getIn =async()=>{
  const diets= await axios.get(DIETS);
  const recipes= await axios.get(RECIPES);
  if(recipes.data.length>0){
    console.log('entro')
    setRecipes(recipes.data);
    setAccess(true);
    access && navigate('/home');
  }

}

useEffect(() => {
  !access && navigate('/');
}, [access,navigate]);

  return (
    <div className="App">
       <Routes>
         <Route path="/" element={<Landing getIn={getIn} />} />

         <Route path="/home" element={<Cards recipes={recipes}/>}/>
            

         {/* <Route path='/about' element={<About/>} />

         <Route path='/detail/:id' element={<Detail/>} />

         <Route path='/favorites' element={<Favorites/>} /> */}
      </Routes>
    </div>
  );
}

export default App;

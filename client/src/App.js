import './App.css';
import {Routes,Route,} from 'react-router-dom';
import Landing from './Views/Landing/Landing.jsx';
import Cards from './components/Cadrs/Cards.jsx';
import Detail from './components/Details/Details.jsx'
import Form from './components/Form/Form.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import Modify from './components/Modify/Modify';
import {LANDING,HOME,ABOUT,DETAIL,FORM,MODIFY} from './Utils/ROUTES'




function App() {


  return (
    <div className="App">
      <NavBar />
       <Routes>
         <Route path={LANDING} element={<Landing  />} />

         <Route path={HOME} element={<Cards />}/>
            
         <Route path={FORM} element={<Form/>} /> 

        <Route path={`${DETAIL}/:id`} element={<Detail/>} />

        <Route path={`${MODIFY}/:id`} element={<Modify/>} />
      </Routes>
    </div>
  );
}

export default App;

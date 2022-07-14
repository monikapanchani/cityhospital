import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './Container/Footer/Footer';
import Header from './Container/Header/Header';
import About from './Container/About/About';
import Contact from './Container/Contact/Contact';
import Department from './Container/Department';
import Doctors from './Container/Doctors/Doctors';
import Home from './Container/Home';
import Login from './Container/Login/Login';
import Medicines from './Container/Medicines/Medicines';
// import Bookapt from './Container/Appointment/Bookapt';
import Patients from './Container/Patients/Patients.js';
import Bookapt from './Container/Appointment/Bookapt';
import Listapt from './Container/Appointment/Listapt';



function App(props) {
  return (
    <div>
      <Header />
      <Switch>
      <Route  exact path={"/"} component={Home}/>
      <Route exact path={"/department"} component={Department}/>
      <Route exact path={"/medicines"} component={Medicines}/>
      <Route exact path={"/doctors"} component={Doctors}/>
      <Route exact path={"/about"} component={About}/>
      <Route exact path={"/contact"} component={Contact}/>
      <Route exact path={"/login"} component={Login}/>
      <Route exact path={"/Bookappoinment"} component={Bookapt} />
        <Route exact path={"/Listappoinment"} component={Listapt} />
      <Route  exact path={"/patients"}  component={Patients}/>
  
     </Switch>
      <Footer/>
    </div>
  );
}

export default App;

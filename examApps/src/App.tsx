import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import RegisterMajor from './views/Register/RegisterMajor';
import RegisterSchedulingTeam from './views/Register/RegisterSchedulingTeam';
import RegisterPIC from './views/Register/RegisterPIC';
import RegisterPrintingTeam from './views/Register/RegisterPrintingTeam';
import RegisterAdministrationTeam from './views/Register/RegisterAdministrationTeam';
import RegisterExamSupervisor from './views/Register/RegisterExamSupervisor';
import RegisterStudent from './views/Register/RegisterStudent';
import RegisterLecturer from './views/Register/RegisterLecturer';
import HomeStudent from './views/Home/HomeStudent';
import HomeLecturer from './views/Home/HomeLecturer';
import HomeMajor from './views/Home/HomeMajor';
import HomePIC from './views/Home/HomePIC';
import HomePrinting from './views/Home/HomePrinting';
import HomeAdministration from './views/Home/HomeAdministration';
import HomeScheduling from './views/Home/HomeScheduling';
import HomeSupervisor from './views/Home/HomeSupervisor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/registerMajor' element={<RegisterMajor />}></Route>
        <Route path='/registerScheduling' element={<RegisterSchedulingTeam />}></Route>
        <Route path='/registerPIC' element={<RegisterPIC />}></Route>
        <Route path='/registerPrinting' element={<RegisterPrintingTeam />}></Route>
        <Route path='/registerAdministration' element={<RegisterAdministrationTeam />}></Route>
        <Route path='/registerExamSupervisor' element={<RegisterExamSupervisor />}></Route>
        <Route path='/registerStudent' element={<RegisterStudent />}></Route>
        <Route path='/registerLecturer' element={<RegisterLecturer />}></Route>
        <Route path='/homeStudent' element={<HomeStudent />}></Route>
        <Route path='/homeLecturer' element={<HomeLecturer />}></Route>
        <Route path='/homeMajor' element={<HomeMajor />}></Route>
        <Route path='/homeScheduling' element={<HomeScheduling />}></Route>
        <Route path='/homePIC' element={<HomePIC />}></Route>
        <Route path='/homePrinting' element={<HomePrinting />}></Route>
        <Route path='/homeAdministration' element={<HomeAdministration />}></Route>
        <Route path='/homeSupervisor' element={<HomeSupervisor />}></Route>
      </Routes>
    </Router>
  )
}

export default App

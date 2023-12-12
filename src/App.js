import './App.css';
import Signin from './components/Signin';
import { AuthContextProvider } from './context/AuthContext';
import {Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Protected from './components/Protected';
function App() {

  return (
      <AuthContextProvider>
        <div className="App">
        <Routes>
          <Route exact path='/' element={<Signin/>}/>
          <Route exact path='/homepage/*' element={<Protected><HomePage/></Protected>}/>
        </Routes>
      </div>
      </AuthContextProvider>
  );
}

export default App;

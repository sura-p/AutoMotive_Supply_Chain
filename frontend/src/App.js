import './App.css';
import NavBar from './components/NavBar';
import CarScreen from './screens/CarScreen';
import {Routes , Route} from 'react-router-dom'
import PartScreen from './screens/PartScreen';
import DealerScreen from './screens/DealerScreen';
import  * as ethers  from "ethers";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const signerMetaMask = async () => {
   const provider = new ethers.BrowserProvider(window.ethereum);
   await provider.send("eth_requestAccounts", [])
     return provider.getSigner();
   
}
function App() {
   const [signer ,setSigner] = useState()
  const dispatch = useDispatch()
  
  useEffect(() => {
    signerMetaMask().then((ele) => {
      dispatch({ type: "GET_ADDRESS", payload: ele })
      setSigner(ele);
   });
   
  }, [])
   console.log(signer);
  return (
    <div className='container'>
      <NavBar/>
      <Routes>
        <Route path='/carfactory' element={<CarScreen/>}></Route>
        <Route path='/partfactory' element={<PartScreen signer={signer} />} ></Route>
        <Route path='/dealer' element= {<DealerScreen/>}> </Route>
      </Routes>
     
    </div>
  );
}

export default App;

import {NavLink, Route, Routes} from "react-router-dom"
import './App.scss';
import Main from "./components/Main";
import Pair from "./components/Pair";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadPairs} from "./redux/actionCreators";
import LikedPairs from "./components/LikedPairs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from "@mui/material/Skeleton";




function App() {
  const {likePairs, pairs, loading} = useSelector(s => s.appReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (pairs.length === 0 && likePairs.length === 0) {
      dispatch(loadPairs())
    }
  }, [])

  return (
    <div className="App">
      <ToastContainer/>
      {
        loading ?
          (
            <div className="menu">
              <Skeleton width={60} style={{'margin-right': 10}} height={20}/>
              <Skeleton width={100} style={{'margin-right': 10}} height={20}/>
            </div>
          ) :
          (
            <div className="menu">
              <NavLink to="/">
                Главная
              </NavLink>
              <NavLink to="/liked">
                Избранное {likePairs.length ? likePairs.length : ''}
              </NavLink>
            </div>
          )
      }
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/pair/:id" element={<Pair/>}/>
        <Route path="/liked" element={<LikedPairs/>}/>
      </Routes>
    </div>
  );
}

export default App;

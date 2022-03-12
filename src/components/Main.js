import {useSelector} from "react-redux";
import {PairGrid} from "./PairGrid";


export default function Main() {
  const {loading} = useSelector(s => s.appReducer)
  return <>
    <PairGrid loading={loading} type="main"/>
  </>
}
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import whiteHeart from "../images/white-heart.png";
import remove from "../images/remove.png";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {useSelector, useDispatch} from "react-redux";
import {setLikePairs, setPairs} from "../redux/actionCreators";
import {useMemo} from "react";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export function PairGrid({loading, type}) {
  const {likePairs, pairs} = useSelector(s => s.appReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentPairs = useMemo(() => {
    if (type === 'main') {
      return pairs
    } else {
      return likePairs
    }
  }, [type, likePairs, pairs])

  function replace(pair, e) {
    e.stopPropagation()
    if (type === 'main') {
      dispatch(setLikePairs([...likePairs, pair]))
      localStorage.setItem(`likedPairs`, JSON.stringify([...likePairs, pair].map(({baseAddress}) => baseAddress)));
      pairs.splice(pairs.indexOf(pair), 1)
      dispatch(setPairs(pairs))
    } else {
      dispatch(setPairs([...pairs, pair]))
      likePairs.splice(likePairs.indexOf(pair), 1)
      dispatch(setLikePairs(likePairs))
      localStorage.setItem(`likedPairs`, JSON.stringify(likePairs.map(({baseAddress}) => baseAddress)));
    }
  }

  return <Grid container spacing={2}>
    {
      loading ? (
        Array(9).fill('').map((_, index) => {
          return <Grid item xs={4} style={{'height': 'calc(33.3vh)'}} key={index}>
            <Skeleton className="skeleton"/>
          </Grid>
        })
      ) : (
        currentPairs.map((pair) => {
          return <Grid item xs={4} onClick={() => navigate(`/pair/${pair.baseAddress}`)} key={pair.baseAddress}>
            <Item className="item" elevation={3}>
              <img src={type === 'main' ? whiteHeart : remove} alt="photo" className="item__image" onClick={(e) => replace(pair, e)}/>
              <div>{pair.base}/{pair.counter}</div>
              <div className="item__fee">Комиссия: {pair.fee} USDT</div>
            </Item>
          </Grid>
        })
      )
    }
    {(currentPairs.length === 0 && !loading) ? <h1>В данном разделе отсутствуют валютные пары</h1> : ''}
  </Grid>
}
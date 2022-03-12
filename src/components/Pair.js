import {useParams} from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createSwap, loadCurrency} from "../redux/actionCreators";
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Skeleton from "@mui/material/Skeleton";
export default function Pair() {
  const {id} = useParams()
  const {currency, loading} = useSelector(s => s.appReducer)
  const [isBuy, setIsBuy] = useState(false)
  const [firstValue, setFirstValue] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(loadCurrency(id))
  }, [])

  function reverse() {
    setIsBuy(!isBuy)
    setFirstValue(secondValue)
    setSecondValue(firstValue)
  }

  function setFirst(value) {
    let price
    setFirstValue(value)
    if (!isBuy) {
      price = value * currency.price
    } else {
      price = value / currency.price
    }
    setSecondValue(price)
  }

  function setSecond(value) {
    let price
    setSecondValue(value)
    if (isBuy) {
      price = value * currency.price
    } else {
      price = value / currency.price
    }
    setFirstValue(price)
  }

  function getLabel(buy) {
    return (
      <InputAdornment position="end">
        {
          loading ? (
            <Skeleton width={50} style={{'margin-right': 10}} height={20}/>
          ) : (
            buy ? currency.currency : 'USDT'
          )
        }
      </InputAdornment>
    )
  }

  function swap() {
    setFirstValue('')
    setSecondValue('')
    dispatch(createSwap(firstValue))
  }
  return <>
    <div>
      <Card sx={{ maxWidth: 400, margin: 'auto' }}>
        <CardContent className="card-content">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={firstValue}
            onInput={(v) => setFirst(v.target.value)}
            type="number"
            endAdornment={getLabel(!isBuy)}
            aria-describedby="outlined-weight-helper-text"
          />
          <Button variant="contained" className="card-content__arrow-btn" onClick={() => reverse()}>↓</Button>
          <OutlinedInput
            type="number"
            value={secondValue}
            onInput={(v) => setSecond(v.target.value)}
            id="outlined-adornment-weight"
            endAdornment={getLabel(isBuy)}
            aria-describedby="outlined-weight-helper-text"
          />
          <Button
            variant="contained"
            className="card-content__course"
            onClick={() => swap()}
            disabled={!firstValue || !secondValue || loading}
          >
            Swap
          </Button>
          <Typography component={'span'} variant="body2" className="card-content__course">
            {
              loading ? (
                <Skeleton width={240} style={{'margin-right': 10}} height={20}/>
              ) : (
                <div>
                  1 {currency.currency} ≈ {currency.price} USDT
                </div>
              )
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  </>
}
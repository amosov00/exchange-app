import {put, call, takeLatest} from "redux-saga/effects";
import {fetchCurrency, fetchPairs, postSwap} from "../api";
import {LOAD_PAIRS, LOAD_CURRENCY, CREATE_SWAP} from "./actions";
import {loadingSet, setCurrency, setLikePairs, setPairs} from "./actionCreators";
import { toast } from 'react-toastify';

function* loadPairsSaga() {
  try {
    const likeArray = JSON.parse(localStorage.getItem(`likedPairs`))
    const pairs = []
    const likedPairs = []
    yield put(loadingSet(true))
    const {data} = yield call(fetchPairs)
    const filteredData = data.filter(pair => pair.counter === 'USDT')
    filteredData.forEach((item) => {
      if (likeArray.includes(item.baseAddress)) {
        likedPairs.push(item)
      } else {
        pairs.push(item)
      }
    })
    yield put(setPairs(pairs))
    yield put(setLikePairs(likedPairs))
  } finally {
    yield put(loadingSet(false))
  }
}


function* loadCurrencySaga({id}) {
  try {
    yield put(loadingSet(true))
    const {data} = yield call(fetchCurrency, id)
    yield put(setCurrency(data))

  } finally {
    yield put(loadingSet(false))
  }
}

function* createSwapSaga() {
  try {
    yield put(loadingSet(true))
    yield call(postSwap)
    toast.success('Успешный обмен!')
  } catch (e) {
    toast.error('Упс! Что-то пошло не так')
  } finally {
    yield put(loadingSet(false))
  }
}

export default function* rootSaga() {
  yield takeLatest(LOAD_PAIRS, loadPairsSaga)
  yield takeLatest(LOAD_CURRENCY, loadCurrencySaga)
  yield takeLatest(CREATE_SWAP, createSwapSaga)
}
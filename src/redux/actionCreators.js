import {LOAD_PAIRS, LOADING_SET, SET_PAIRS, SET_LIKE_PAIRS, LOAD_CURRENCY, SET_CURRENCY, CREATE_SWAP} from "./actions";

export function loadingSet(payload) {
  return {
    type: LOADING_SET,
    payload
  }
}

export function setPairs(payload) {
  return {
    type: SET_PAIRS,
    payload
  }
}

export function setLikePairs(payload) {
  return {
    type: SET_LIKE_PAIRS,
    payload
  }
}

export function loadPairs() {
  return {
    type: LOAD_PAIRS,
  }
}

export function loadCurrency(id) {
  return {
    type: LOAD_CURRENCY,
    id
  }
}

export function setCurrency(payload) {
  return {
    type: SET_CURRENCY,
    payload
  }
}

export function createSwap(payload) {
  return {
    type: CREATE_SWAP,
    payload
  }
}





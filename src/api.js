import axios from 'axios';

const $axios = axios.create({
  baseURL: 'https://ton-swap-indexer.broxus.com/v1'
})

export function fetchPairs() {
  return $axios.get('/pairs/meta')
}

export function fetchCurrency(data) {
  return $axios.post(`/currencies/${data}`)
}

export function postSwap() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve()
      } else {
        reject()
      }
    }, 6000)
  })
}
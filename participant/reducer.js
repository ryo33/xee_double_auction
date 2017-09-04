import { createReducer } from 'redux-act'

const reducer = createReducer({
  'RECEIVE_CONTENTS': (_, contents) => contents,
  'update contents': () => ({ loading: false }),
}, {
  loading: true,
  mode: 'waiting',
  buyerBids: [],
  sellerBids: [],
  highestBid: null,
  lowestBid: null,
  deals: [],
  personal: {
  },
  dynamic_text: null,
})

export default reducer

import { createReducer } from 'redux-act'

import { ReadJSON } from '../util/ReadJSON'

const reducer = createReducer({
  'RECEIVE_CONTENTS': (_, contents) => contents.dynamic_text? contents : Object.assign(contents, { dynamic_text: ReadJSON().dynamic_text }),
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

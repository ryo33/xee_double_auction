import combineSectionReducers from 'combine-section-reducers'

import {enableScreenMode, disableScreenMode} from 'host/actions'

import { createReducer } from 'redux-act'

const reducer = createReducer({
  'RECEIVE_CONTENTS': (_, contents) => contents,
  'update contents': () => ({ loading: false }),
  [enableScreenMode]: (state, action) => Object.assign({}, state, {screenMode: true}),
  [disableScreenMode]: (state, action) => Object.assign({}, state, {screenMode: false})
}, {
  loading: true,
  mode: 'wating',
  users: {},
  buyerBids: [],
  sellerBids: [],
  deals: [],
  highestBid: null,
  lowestBid: null,
  screenMode: false
})
export default reducer

import combineSectionReducers from 'combine-section-reducers'

import {enableScreenMode, disableScreenMode} from './actions'

import { createReducer } from 'redux-act'

import { ReadJSON } from '../util/ReadJSON'

const reducer = createReducer({
  'RECEIVE_CONTENTS': (_, contents) => contents.dynamic_text? contents : Object.assign(contents, { dynamic_text: ReadJSON().dynamic_text }),
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
  screenMode: false,
  ex_type: 'simple',
  price_base: 100,
  price_inc: 100,
  price_max: 20,
  price_min: 10,
  dynamic_text: null,
  hist: [],
})
export default reducer

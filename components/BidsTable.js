import React, { Component } from 'react'
import throttle from 'react-throttle-render'

import clone from 'clone'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { ReadJSON, InsertVariable, LineBreak } from '../util/ReadJSON'

const BidsTable = ({ buyerBids, sellerBids, deals, highestBid, lowestBid, expanded, dynamic_text }) => {
  const rows = []
  const length = Math.max.apply(null, [buyerBids, sellerBids, deals].map(a => a.length))
  const maxValue = highestBid ? highestBid.bid : 0
  const minValue = lowestBid ? lowestBid.bid : 0
  const tableValue = (value) => {
    if (typeof value === 'undefined') {
      return ''
    } else {
      return value
    }
  }

  buyerBids = clone(buyerBids).sort((a, b) => b.bid - a.bid)
  sellerBids = clone(sellerBids).sort((a, b) => a.bid - b.bid)

  function get(map, key) {
    return map ? map[key] : null
  }
  for (let i = 0; i < length; i ++) {
    rows.push(
      <tr key={`${get(buyerBids[i], 'id')}-${get(sellerBids[i], 'id')}-${get(deals[i], 'id')}`}>
        <td>{tableValue(get(buyerBids[i], 'bid'))}</td>
        <td>{tableValue(get(sellerBids[i], 'bid'))}</td>
        <td>{tableValue(get(deals[i], 'deal'))}</td>
      </tr>
    )
  }
  return (
    <Card
      initiallyExpanded={expanded}
    >
      <CardHeader
        title={
          <span>{LineBreak(InsertVariable(ReadJSON().static_text["table_title"], { buyer_num: buyerBids.length, seller_num: sellerBids.length, deals_num: deals.length, max_value: maxValue, min_value: minValue}, dynamic_text["variables"]))}</span>
        }
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <table>
          <thead>
            <tr>
              <th>{dynamic_text["variables"]["buying_price"]}</th>
              <th>{dynamic_text["variables"]["selling_price"]}</th>
              <th>{InsertVariable(ReadJSON().static_text["success_price"], {}, dynamic_text["variables"])}</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </CardText>
    </Card>
  )
}

export default throttle(BidsTable, 500)


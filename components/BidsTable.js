import React, { Component } from 'react'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const BidsTable = ({ buyerBids, sellerBids, deals }) => {
  const rows = []
  const length = Math.max.apply(null, [buyerBids, sellerBids, deals].map(a => a.length))
  const maxValue = Math.max.apply(null, buyerBids)
  const minValue = Math.min.apply(null, sellerBids)
  const tableValue = (value) => {
    if (typeof value === 'undefined') {
      return ''
    } else {
      return value
    }
  }
  buyerBids = buyerBids.sort((a, b) => b - a)
  sellerBids = sellerBids.sort((a, b) => a - b)
  for (let i = 0; i < length; i ++) {
    rows.push(
      <tr key={i}>
        <td>{tableValue(buyerBids[i])}</td>
        <td>{tableValue(sellerBids[i])}</td>
        <td>{tableValue(deals[i])}</td>
      </tr>
    )
  }
  return (
    <Card
      initiallyExpanded={false}
    >
      <CardHeader
        title={
          <span>買い手：{buyerBids.length}人、売り手：{sellerBids.length}人、成立済み：{deals.length}件<br />
          買い手最高値：{maxValue}、売り手最安値：{minValue}</span>
        }
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <table>
          <thead>
            <tr>
              <th>買値</th>
              <th>売値</th>
              <th>成立価格</th>
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


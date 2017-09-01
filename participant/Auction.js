import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

import Divider from 'material-ui/Divider'

import DealDialog from './DealDialog'
import BidsTable from 'components/BidsTable'
import BidForm from './BidForm'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

const mapStateToProps = ( {personal, buyerBids, sellerBids, deals, highestBid, lowestBid} ) =>
Object.assign({}, personal, { buyerBids, sellerBids, deals, highestBid, lowestBid })

const Buyer = ({ money, bidded, bid, dealt, deal }) => {
  if (dealt) {
    return (
      <div>
        <DealDialog 
        deal = {deal}
        bid = {bid}
        profit = {money - deal}
        />
        <p>{InsertVariable(ReadJSON().static_text["success_text"], { deal: deal, bid: bid })}</p>
        <p>{InsertVariable(ReadJSON().static_text["benefit"], { benefit: money - deal })}</p>
      </div>
    )
  } else {
    return (
      <div>
            <p>{ReadJSON().static_text["your_buyer"]}</p>
            <p>{InsertVariable(ReadJSON().static_text["buy"], { money: money })}</p>
            {bidded
              ? <p>{InsertVariable(ReadJSON().static_text["buyer_suggest"], { bid: bid })}</p>
              : null
            }
            <BidForm />
      </div>
    )
  }
}

const Seller = ({ money, bidded, bid, dealt, deal }) => {
  if (dealt) {
    return (
      <div>
        <DealDialog 
        deal = {deal}
        bid = {bid}
        profit = {deal - money}
        />
        <p>{InsertVariable(ReadJSON().static_text["success_text"], { deal: deal, bid: bid })}</p>
        <p>{InsertVariable(ReadJSON().static_text["benefit"], { benefit: deal - money })}</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>{ReadJSON().static_text["your_seller"]}</p>
        <p>{InsertVariable(ReadJSON().static_text["sell"], { money: money })}</p>
        {bidded
          ? <p>{InsertVariable(ReadJSON().static_text["seller_suggest"], { bid: bid })}</p>
          : null
        }
        <BidForm />
      </div>
    )
  }
}

const Auction = ({ buyerBids, sellerBids, deals, highestBid, lowestBid, role, money, bidded, bid, dealt, deal }) => (
  <div>
    <Card>
    <CardText>
    { role == "buyer" ? <Buyer money={money} bidded={bidded} bid={bid} dealt={dealt} deal={deal} /> : null }
    { role == "seller" ? <Seller money={money} bidded={bidded} bid={bid} dealt={dealt} deal={deal} /> : null }
    { role == null ? <p>{ReadJSON().static_text["donot_join"]}</p> : null }
    </CardText>
    </Card>
    <Divider
        style={{
            marginTop: "5%",
        }}
    />
    <BidsTable
      buyerBids={buyerBids}
      sellerBids={sellerBids}
      deals={deals}
      highestBid={highestBid}
      lowestBid={lowestBid}
      expanded={true}
    />
  </div>
)

export default connect(mapStateToProps)(Auction)

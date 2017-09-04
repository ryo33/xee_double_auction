import React, { Component } from 'react'
import { connect } from 'react-redux'

import BidsTable from 'components/BidsTable'
import Chart from 'components/Chart'

const mapStateToProps = ({ buyerBids, sellerBids, deals, users, dynamic_text }) => ({
  buyerBids,
  sellerBids,
  deals,
  users,
  dynamic_text
})

class Result extends Component {
    render() {
      const {buyerBids, sellerBids, deals, users, dynamic_text } = this.props
        return (
          <div>
            <BidsTable
              buyerBids={buyerBids}
              sellerBids={sellerBids}
              deals={deals}
              dynamic_text={dynamic_text}
            />
            <Chart
              users={users}
              deals={deals}
              expanded={true}
              dynamic_text={dynamic_text}
            />
          </div>
        )
    }
}

export default connect(mapStateToProps)(Result)

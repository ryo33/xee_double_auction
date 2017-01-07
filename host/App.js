import React, { Component } from 'react'
import { connect } from 'react-redux'
import keydown, { Keys } from 'react-keydown'

import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress';

import ActionDispatcher from 'components/ActionDispatcher'
import MessageSender from 'components/MessageSender'
import Chart from 'components/Chart'
import BidsTable from 'components/BidsTable'
import ModeButtons from './ModeButtons'
import Users from './Users'
import ScreenMode from './ScreenMode'
import SettingButton from './SettingButton'
import EditButton from './EditButton.js'
import DownloadButton from './DownloadButton'

import { enableScreenMode } from './actions'

const mapStateToProps = ({ mode, loading, buyerBids, sellerBids, deals, highestBid, lowestBid, users, screenMode }) => ({
  mode,
  loading,
  buyerBids,
  sellerBids,
  highestBid,
  lowestBid,
  deals,
  users,
  screenMode
})

const { ESC } = Keys

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      screenMode: false
    }
  }

  componentWillReceiveProps({ keydown, mode: nextMode }) {
    if (keydown.event && keydown.event.which == ESC) {
      this.setState({
        screenMode: false
      })
    }
    if (this.props.mode !== nextMode) {
      if(nextMode === 'result') {
        Materialize.toast('ScreenModeを終了するにはESCキーを押してください。', 4000, 'rounded')
        this.setState({
          screenMode: true
        })
      }
    }
  }

  componentDidMount() {
    sendData("fetch_contents")
  }

  render() {
    const { mode, loading, buyerBids, sellerBids, deals, highestBid, lowestBid, users } = this.props

    if (loading) {
      return (
        <Card style={{padding: '20px'}}>
          <CardTitle title="接続中" style={{padding: '0px', marginTop: '7px', marginBottom: '14px'}}/>
          <CardText style={{padding: '0px', margin: '0px'}}>
            <div style={{textAlign: 'center'}}>
              <CircularProgress style={{margin: '0px', padding: '0px' }} />
            </div>
            　　　		<p style={{margin: '0px', padding: '0px'}}>サーバーに接続しています。<br/>このまましばらくお待ちください。</p>
          </CardText>
        </Card>
      )
    } else {
      return (
        <span>
          { this.state.screenMode
              ? <ScreenMode />
              : (
                <div>
                  <ModeButtons />
                  <Divider
                    style={{
                      marginTop: "5%",
                      clear: "right"
                    }}
                  />
                  <div style={{ marginTop: "5%" }}>
                    <Users />
                  </div>
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
                    expanded={false}
                  />
                  <Divider
                    style={{
                      marginTop: "5%",
                    }}
                  />
                  <Chart
                    users={users}
                  /><br />
                  <SettingButton
                    disabled={true}
                  />
                  <EditButton
                    style={{marginLeft: "2%"}}
                    disabled={true}
                  />
                  <DownloadButton
                    fileName={"double_auction.csv"}
                    list={[
                      ["Double Auction"],
                      ["Date and time", new Date()],
                      ["The number of participants", Object.keys(users).length],
                      ["ID", "Role", "Money", "Bit", "Deal"],
                      ...(Object.keys(users).map(id => {
                        const user = users[id]
                        return [id, user.role, user.money, user.bid, user.deal]
                      })),
                      [],
                      ["Deal", "ID1", "ID2", "time"],
                      ...(deals.map(deal => {
                        return [
                          deal.deal,
                          deal.participant_id,
                          deal.participant_id2,
                          deal.time,
                        ]
                      }))
                    ]}
                    style={{marginLeft: '2%'}}
                    disabled={mode != "result"}
                  />
                </div>
              )
          }
        </span>
      )
    }
  }
}

export default connect(mapStateToProps)(keydown(App))

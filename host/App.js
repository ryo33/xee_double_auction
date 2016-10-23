import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress';

import ActionDispatcher from 'components/ActionDispatcher'
import MessageSender from 'components/MessageSender'
import Chart from 'components/Chart'
import ModeButtons from './ModeButtons'
import MatchingButton from './MatchingButton'
import BidsTable from 'components/BidsTable'
import Users from './Users'
import ScreenMode from './ScreenMode'

import { enableScreenMode } from './actions'

const mapStateToProps = ({ loading, buyerBids, sellerBids, deals, users, screenMode }) => ({
  loading,
  buyerBids,
  sellerBids,
  deals,
  users,
  screenMode
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    sendData("fetch_contents")
  }

  enableScreenMode() {
    const { dispatch } = this.props
    dispatch(enableScreenMode())
  }

  render() {
    const { loading, buyerBids, sellerBids, deals, users, screenMode } = this.props

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
          { screenMode
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
                />
                <Divider
                  style={{
                    marginTop: "5%",
                  }}
                />
                <Chart
                  users={users}
                /><br />
                <MatchingButton /><br />
                <RaisedButton onClick={this.enableScreenMode.bind(this)} primary={true} style={{ marginTop: '3%' }}>スクリーンモードに移行</RaisedButton>
              </div>
            )
          }
        </span>
      )
    }
  }
}

export default connect(mapStateToProps)(App)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress';

import Auction from 'participant/Auction'
import Wait from 'participant/Wait'
import Description from 'participant/Description'
import Result from 'participant/Result'

const mapStateToProps = ({loading, mode}) => ({
  loading,
  mode
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    sendData("fetch_contents")
  }

  render() {
    const { loading, mode } = this.props
    if(loading) {
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
    }else{
      return (
        <MuiThemeProvider>
          <div>
            { (mode == "auction") ? <Auction /> : null }
            { (mode == "wait") ? <Wait /> : null }
            { (mode == "description") ? <Description /> : null }
            { (mode == "result") ? <Result /> : null }
          </div>
        </MuiThemeProvider>
      )
    }
  }
}

export default connect(mapStateToProps)(App)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import keydown, { Keys } from 'react-keydown'
import download from 'datauri-download'

import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'

import { HostPage } from 'xee-components'
import Chart from 'components/Chart'
import BidsTable from 'components/BidsTable'
import Users from './Users'
import ScreenPage from './ScreenPage'

import { enableScreenPage } from './actions'
import { getPage } from 'util/index'
import { submitMode } from 'host/actions'

const pages = ["wait", "description", "auction", "result"]

const mapStateToProps = ({ mode, loading, buyerBids, sellerBids, deals, highestBid, lowestBid, users, screenPage }) => ({
  mode,
  loading,
  buyerBids,
  sellerBids,
  highestBid,
  lowestBid,
  deals,
  users,
  screenPage
})

const { ESC } = Keys

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      screenPage: false,
      setting: false,
      edit: false
    }
    this.handleOpenSetting = () => this.setState({
      setting: true
    })
    this.handleCloseSetting = () => this.setState({
      setting: false
    })
    this.handleOpenEdit = () => this.setState({
      edit: true
    })
    this.handleCloseEdit = () => this.setState({
      edit: false
    })
    this.handleCloseScreenPage = () => this.setState({
      screenPage: false
    })
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
  }

  handleChangePage(page) {
    this.props.dispatch(submitMode(page))
  }

  handleDownload() {
    const { users, deals } = this.props
    const fileName = "double_auction.csv"
    const list = [
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
    ]
    const content = list.map(line => line.join(',')).join("\n")
    download(fileName, 'text/csv;charset=utf-8', content)
  }

  componentWillReceiveProps({ keydown, mode: nextPage }) {
    if (keydown.event && keydown.event.which == ESC) {
      this.setState({
        screenPage: false
      })
    }
    if (this.props.mode !== nextPage) {
      if(nextPage === 'result') {
        Materialize.toast('ESCキーを押すと管理者画面に戻ります。', 5000, 'rounded')
        this.setState({
          screenPage: true
        })
      }
    }
  }

  componentDidMount() {
    sendData("fetch_contents")
  }

  render() {
    const { mode, loading, buyerBids, sellerBids, deals, highestBid, lowestBid, users } = this.props
    if (this.state.screenPage) {
      return (
        <div>
          <ScreenPage />
          <RaisedButton
            label={"管理者画面へ"}
            onTouchTap={this.handleCloseScreenPage}
            style={{
              marginTop: "5%",
            }}
          />
        </div>
      )
    } else {
      return (
        <HostPage
          page={mode}
          getPageName={getPage}
          pages={pages}
          changePage={this.handleChangePage}
          openSettingDialog={this.handleOpenSetting}
          openEditDialog={this.handleOpenEdit}
          downloadFile={this.handleDownload}
          loading={loading}
          settingButton={mode == "wait"}
          editButton={mode == "wait"}
          downloadButton={mode == "result"}
        >
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
            deals={deals}
            expanded={false}
          />
          <Dialog
            title={"オプション"}
            actions={[
              <RaisedButton
                label={"適用"}
                primary={true}
                onTouchTap={this.handleCloseSetting}
              />
            ]}
            model={false}
            open={this.state.setting}
            autoScrollBodyContent={true}
          />
          <Dialog
            title={"編集"}
            actions={[
              <RaisedButton
                label={"適用"}
                primary={true}
                onTouchTap={this.handleCloseEdit}
              />
            ]}
            model={false}
            open={this.state.edit}
            autoScrollBodyContent={true}
          />
        </HostPage>
      )
    }
  }
}

export default connect(mapStateToProps)(keydown(App))

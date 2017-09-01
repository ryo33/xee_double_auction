import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import throttleProps from 'react-throttle-render'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

const mapStateToProps = ({personal}) => ({
  role: personal.role,
  money: personal.money
})

class DealDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
  }
  
  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {
    const actions = [
      <FlatButton
        label={ReadJSON().static_text["ok"]}
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ]
    return (
      <div>
        <Dialog
          title={ReadJSON().static_text["deal_success"][0]}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        <p>{InsertVariable(ReadJSON().static_text["deal_success"][1], { deal: this.props.deal})}</p>
        <p>{InsertVariable(ReadJSON().static_text["deal_success"][2], { bid: this.props.bid})}</p>
        <p>{InsertVariable(ReadJSON().static_text["deal_success"][3], { profit: this.props.profit})}</p>
        <p>{ReadJSON().static_text["deal_success"][4]}</p>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps)(throttleProps(DealDialog))

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import throttleProps from 'react-throttle-render'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

const mapStateToProps = ({personal, dynamic_text}) => ({
  role: personal.role,
  money: personal.money,
  dynamic_text: dynamic_text
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
        <p>{InsertVariable(ReadJSON().static_text["deal_success"][1], { deal: this.props.deal}, this.props.dynamic_text["variables"])}</p>
        <p>{InsertVariable(ReadJSON().static_text["deal_success"][2], { bid: this.props.bid}, this.props.dynamic_text["variables"])}</p>
        <p>{InsertVariable(ReadJSON().static_text["deal_success"][3], { benefit: this.props.profit}, this.props.dynamic_text["variables"])}</p>
        <p>{ReadJSON().static_text["deal_success"][4]}</p>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps)(throttleProps(DealDialog))

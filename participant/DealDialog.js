import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import throttleProps from 'react-throttle-render'

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
        label="OK"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ]
    return (
      <div>
        <Dialog
          title="取引成立"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        <p>{this.props.deal}で取引が成立しました。</p>
        <p>(あなたの提案: {this.props.bid}) </p>
        <p>利益は{this.props.profit}です。</p>
        <p>実験終了までしばらくお待ち下さい。</p>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps)(throttleProps(DealDialog))

import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { changeRound } from './actions'

class SettingButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    const { disabled } = this.props
    const actions = [
      <RaisedButton
        label={"適用"}
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ]
    return (
      <span>
        <FloatingActionButton
          onClick={this.handleOpen.bind(this)}
          disabled={disabled}
        >
          <ActionSettings />
        </FloatingActionButton>
        <Dialog
          title={"オプション"}
          actions={actions}
          model={false}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
        </Dialog>
      </span>
    )
  }
}

export default SettingButton

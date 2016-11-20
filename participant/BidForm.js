import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import debounce from 'lodash.debounce'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SnackBar from 'material-ui/SnackBar'

import { bid } from './actions'

import throttleProps from 'react-throttle-render'

const mapStateToProps = ({personal}) => ({
  role: personal.role,
  money: personal.money
})

class BidForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isValid: false,
      snack: false,
      bid: '',
      errorText: ''
    }
    this.setErrorText = debounce(this.setErrorText, 500)
  }

  closeSnack() {
    this.setState({
      snack: false
    })
  }

  handleChange(event) {
    const value = event.target.value
    const { role, money } = this.props
    const numValue = parseInt(value, 10)
    const isValid = role == "buyer"
      ? numValue <= money && numValue > 0
      : numValue >= money

    this.setState({
      value,
      isValid
    })

    if (isValid || value == '') {
      this.setErrorText.cancel()
      this.setState({ errorText: '' })
    } else {
      this.setErrorText(role, numValue)
    }
  }

  setErrorText(role, numValue) {
    if (isNaN(numValue)) {
      this.setState({ errorText: '正の整数を入力してください'})
    } else {
      if (role == "buyer") {
        this.setState({ errorText: '予算以下の価格で提案して下さい'})
      } else {
        this.setState({ errorText: '仕入れ値以上の価格で提案して下さい'})
      }
    }
  }

  handleClick() {
    const { dispatch } = this.props
    const { value } = this.state
    this.setState({
      value: '',
      isValid: false,
      snack: true,
      bid: value
    })
    dispatch(bid(parseInt(value, 10)))
  }

  handleKeyDown(event) {
    const { isValid } = this.state
    if (isValid && (event.key === "Enter" || event.keyCode === 13)) { // Enter
      this.handleClick()
    }
  }

  render() {
    const { value, bid, snack, isValid } = this.state
    return (
      <div>
        <TextField
          autoFocus
          value={value}
          errorText = {this.state.errorText}
          floatingLabelText='提案金額'
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        /><br/>
        <RaisedButton
          primary={true}
          disabled={!isValid}
          onClick={this.handleClick.bind(this)}
          style={{marginTop: 18}}
        >送信</RaisedButton>
        <SnackBar
          open={snack}
          message={'あなたは'+ bid + 'で提案しました。'}
          autoHideDuration={3000}
          onRequestClose={this.closeSnack.bind(this)}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(throttleProps(BidForm))

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = ({ userNumber }) => ({ userNumber })

class Wait extends Component {
    render() {
        const { userNumber } = this.props
        return (
            <div>
                <Card>
                    <CardTitle title="ダブルオークション実験" subtitle="待機中"/>
                    <CardText>
                        <p>参加者の登録を待っています。</p>
                        <p>この画面のまましばらくお待ち下さい。</p>
                        <p>現在の参加者は{ userNumber }人です。</p>
                    </CardText>
                    <div style={{textAlign: "center"}}>
                        <CircularProgress size={2}/>
                    </div>
                </Card>
            </div>
        )
    }
}
export default connect(mapStateToProps)(Wait)

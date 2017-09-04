import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText, CardAction } from 'material-ui/Card'

import { ReadJSON, InsertVariable, LineBreak } from '../util/ReadJSON'

const mapStateToProps = ({personal, dynamic_text}) => ({
    role: personal.role,
    money: personal.money,
    dynamic_text: dynamic_text,
})

class Description extends Component {
    constructor(props){
      super(props)
    }
    render() {
        const { role, money, dynamic_text } = this.props
        return (
        <Card>
            <CardTitle title={ReadJSON().static_text["title"]} subtitle={dynamic_text["desc"][0]}/>
                <CardText>
                    <p>{LineBreak(InsertVariable(dynamic_text["desc"][1], {}, dynamic_text["variables"]))}</p>

                    {role == "buyer"?
                    <p>{LineBreak(InsertVariable(dynamic_text["desc"][2], { money: money }, dynamic_text["variables"]))}</p>
                    :
                    <p>{LineBreak(InsertVariable(dynamic_text["desc"][3], { money: money }, dynamic_text["variables"]))}</p>
                    }
                    <p>{LineBreak(InsertVariable(dynamic_text["desc"][4], {}, dynamic_text["variables"]))}</p>
                </CardText>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Description)

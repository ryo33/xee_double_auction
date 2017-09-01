import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText, CardAction } from 'material-ui/Card'

import { ReadJSON, InsertVariable, LineBreak } from '../util/ReadJSON'

const mapStateToProps = ({personal}) => ({
    role: personal.role,
    money: personal.money
})

class Description extends Component {
    constructor(props){
      super(props)
    }
    render() {
        return (
        <Card>
            <CardTitle title={ReadJSON().static_text["title"]} subtitle={ReadJSON().static_text["desc"][0]}/>
                <CardText>
                    <p>{LineBreak(ReadJSON().static_text["desc"][1])}</p>

                    {this.props.role == "buyer"?
                    <p>{LineBreak(InsertVariable(ReadJSON().static_text["desc"][2], { money: this.props.money }))}</p>
                    :
                    <p>{LineBreak(InsertVariable(ReadJSON().static_text["desc"][3], { money: this.props.money }))}</p>
                    }
                    <p>{LineBreak(ReadJSON().static_text["desc"][4])}</p>
                </CardText>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Description)

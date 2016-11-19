import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText, CardAction } from 'material-ui/Card'

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
            <CardTitle title="ダブルオークション実験" subtitle="説明"/>
                <CardText>
                    <p>これからある財の取引を行います。<br/>
                    参加者は売り手と買い手に分かれます。<br/>
                    あなたは、なるべく多くの利益が出るように取引してください。</p>

                    {this.props.role == "buyer"?
                    <p>あなたは買い手です。予算は{this.props.money}です。<br/>
                    買い手は、なるべく低い価格で財を購入し、多くの利益を上げてください。<br/>
                    また、予算よりも高い価格で財を購入することはできません。</p>
                    :
                    <p>あなたは売り手です。仕入れ値は{this.props.money}です。<br/>
                    売り手は、なるべく高い価格で財を販売し、多くの利益を上げてください。<br/>
                    また、仕入れ値よりも低い価格で財を販売することはできません。</p>
                    }
                    <p>提案価格は正の整数で入力しなければなりません。<br/>
                    また、提案価格は取引が成立するまで何度でも変更することができます。</p>
                </CardText>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Description)

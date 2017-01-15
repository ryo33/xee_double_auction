import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { getRole } from 'util/index'
import { openParticipantPage } from 'host/actions'

const User = ({ id, role, money, bid, bidded, dealt, deal, openParticipantPage }) => (
  <tr>
    <td><a onClick={openParticipantPage}>{id}</a></td>
    <td>{getRole(role)}</td>
    <td>{money}</td>
    <td>{
      dealt
        ? deal + "で成立"
        : bidded
          ? bid + "を入札"
          : "未入札"
    }</td>
  </tr>
)

const mapStateToProps = ({ users }) => ({ users })
const actionCreators = {
  openParticipantPage
}

const Users = ({ users, openParticipantPage }) => (
  <Card initiallyExpanded={false}>
    <CardHeader
      title={"登録者 " + Object.keys(users).length + "人"}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>役割</th>
            <th>価格</th>
            <th>状態</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(users).map(id => (
              <User
                key={id}
                id={id}
                role={users[id].role}
                money={users[id].money}
                bid={users[id].bid}
                bidded={users[id].bidded}
                dealt={users[id].dealt}
                deal={users[id].deal}
                openParticipantPage={
                  () => openParticipantPage(id)
                }
              />
              ))
          }
        </tbody>
      </table>
    </CardText>
  </Card>
)

export default connect(mapStateToProps, actionCreators)(throttle(Users, 500))

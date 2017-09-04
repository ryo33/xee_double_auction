import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { getRole } from 'util/index'
import { openParticipantPage } from 'host/actions'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

const User = ({ id, role, money, bid, bidded, dealt, deal, openParticipantPage }) => (
  <tr>
    <td><a onClick={openParticipantPage}>{id}</a></td>
    <td>{getRole(role)}</td>
    <td>{money}</td>
    <td>{
      dealt
        ? InsertVariable(ReadJSON().static_text["success"], { deal: deal })
        : bidded
          ? InsertVariable(ReadJSON().static_text["bid"], { bid: bid })
          : ReadJSON().static_text["yet"]
    }</td>
  </tr>
)

const mapStateToProps = ({ users, dynamic_text }) => ({ users, dynamic_text })
const actionCreators = {
  openParticipantPage
}

const Users = ({ users, openParticipantPage, dynamic_text }) => (
  <Card initiallyExpanded={false}>
    <CardHeader
      title={InsertVariable(ReadJSON().static_text["registrant_num"], {number: Object.keys(users).length })}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      <table>
        <thead>
          <tr>
            <th>{ReadJSON().static_text["id"]}</th>
            <th>{ReadJSON().static_text["role"]}</th>
            <th>{dynamic_text["variables"]["price"]}</th>
            <th>{ReadJSON().static_text["state"]}</th>
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

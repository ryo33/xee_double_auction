import React from 'react'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

const Chart = ({users, deals, expanded, dynamic_text}) => {
  const usersCount = Object.keys(users).length
  const buyerBids = [], sellerBids = [], dealtlog = []
  let consumerSurplus = 0
  let producerSurplus = 0
  let totalSurplus = 0
  for (let id of Object.keys(users)) {
    const user = users[id]
    if (user.bidded || user.dealt) {
      if (user.role == "buyer") {
        if (user.dealt) consumerSurplus += user.money - user.deal
        buyerBids.push(user.money)
      } else {
        if (user.dealt) producerSurplus += user.deal - user.money
        sellerBids.push(user.money)
      }
    }
  }

  function get(map, key) {
    return map ? map[key] : null
  }

  const dealtCount = Object.keys(deals).length
  for (let i = 0; i <= dealtCount; i ++) {
    dealtlog.push(get(deals[i], 'deal'))
  }
  totalSurplus = consumerSurplus + producerSurplus
  buyerBids.push(0 - 100)
  sellerBids.push(usersCount * 100 + 100)
  return (
    <Card initiallyExpanded={expanded}>
      <CardHeader
        title={ReadJSON().static_text["graph"]}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <p>{InsertVariable(ReadJSON().static_text["surplus"], {consumer_surplus: consumerSurplus, producer_surplus: producerSurplus, total_surplus: totalSurplus })}</p>
        <Highcharts config={{
          chart: {
            type: 'area',
            animation: false,
            inverted: true
          },
          title: {
            text: ReadJSON().static_text["graph_title"]
          },
          xAxis: {
            title: {
              text: dynamic_text["variables"]["price"]
            },
            min: 0,
            max: usersCount * 100,
            tickInterval: 100,
            reversed: false,
            plotLines: [{
              color: 'black',
              dashStyle: 'dot',
              width: 2,
              value: usersCount * 50 + 50,
              label: {
                align: 'right',
                x: -10,
                text: InsertVariable(ReadJSON().static_text["ideal_price"], { min: (usersCount * 50), max: (usersCount * 50 + 100) }, dynamic_text["variables"])
              },
              zIndex: 99
            }]
          },
          yAxis: {
            title: {
              text: ReadJSON().static_text["number"]
            },
            min: 0,
            max: usersCount / 2,
            tickInterval: 1,
            plotLines: [{
              color: 'black',
              dashStyle: 'dot',
              width: 2,
              value: (Math.floor(usersCount / 4)),
              label: {
                rotation: 0,
                y: 15,
                x: 10,
                text: InsertVariable(ReadJSON().static_text["ideal_number"], { number: (Math.floor(usersCount / 4)) })
            },
            zIndex: 99
            }]
          },
          plotOptions: {
            area: {
              fillOpacity: 0.5,
              marker: {
                enabled: false
              }
            }
          },
          series: [{
            animation: false,
            name: ReadJSON().static_text["demand"],
            step: 'right',
            data: buyerBids.sort((a, b) => a - b).map((x, y, a) => [x, a.length - y])
          }, {
            animation: false,
            name: ReadJSON().static_text["supply"],
            step: 'left',
            data: sellerBids.sort((a, b) => a - b).map((x, y) => [x, y + 1])
          }]
        }} />
        <Highcharts config={{
          chart: {
            animation: false,
            inverted: false
          },
          title: {
            text: InsertVariable(ReadJSON().static_text["price_change"], {}, dynamic_text["variables"])
          },
          xAxis: {
            title: {
              text: ReadJSON().static_text["success_order"],
            },
            min: 1,
            max: dealtCount + 2,
            tickInterval: 1,
            reversed: false,
            plotLines: [{
              color: 'black',
              dashStyle: 'dot',
              width: 2,
              value: (Math.floor(usersCount / 4)),
              label: {
                rotation: 0,
                y: 15,
                x: -10,
                align: 'right',
                text: InsertVariable(ReadJSON().static_text["ideal_number"], { number: (Math.floor(usersCount / 4)) })
              },
              zIndex: 99
            }]
          },
          yAxis: {
            title: {
              text: dynamic_text["variables"]["price"]
            },
            min: 0,
            max: usersCount * 100,
            tickInterval: 100,
            plotLines: [{
              color: 'black',
              dashStyle: 'dot',
              width: 2,
              value: usersCount * 50 + 50,
              label: {
                align: 'right',
                x: -10,
                text: InsertVariable(ReadJSON().static_text["ideal_price"], { min: (usersCount * 50), max: (usersCount * 50 + 100) }, dynamic_text["variables"])
              },
              zIndex: 99
            }]
          },
          plotOptions: {
            area: {
              fillOpacity: 0.5,
              marker: {
                enabled: false
              }
            }
          },
          series: [{
            type: 'area',
            animation: false,
            name: InsertVariable(ReadJSON().static_text["success_price"], {}, dynamic_text["variables"]),
            data: dealtlog.reverse()
          }]
        }} />
    </CardText>
  </Card>
  )
}

export default throttle(Chart, 500)

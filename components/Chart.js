import React from 'react'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

const Chart = ({users, deals, expanded}) => {
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
  dealtlog.push(0)
  for (let i = 0; i <= dealtCount; i ++) {
    dealtlog.push(get(deals[i], 'deal'))
  }

  totalSurplus = consumerSurplus + producerSurplus
  buyerBids.push(0 - 100)
  sellerBids.push(usersCount * 100 + 100)
  return (
    <Card initiallyExpanded={expanded}>
      <CardHeader
        title="結果グラフ"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <p>消費者余剰：{consumerSurplus}, 生産者余剰：{producerSurplus}, 総余剰：{totalSurplus}</p>
        <Highcharts config={{
          chart: {
            type: 'area',
            animation: false,
            inverted: true
          },
          title: {
            text: "需要・供給曲線"
          },
          xAxis: {
            title: {
              text: '価格'
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
                text: '理論的な均衡価格(' + (usersCount * 50) + '～' + (usersCount * 50 + 100) + ')'
              },
              zIndex: 99
            }]
          },
          yAxis: {
            title: {
              text: '数量'
            },
            min: 0,
            max: usersCount / 2,
            tickInterval: 1,
            plotLines: [{
              color: 'black',
              dashStyle: 'dot',
              width: 2,
              value: usersCount / 4,
              label: {
                rotation: 0,
                y: 15,
                x: 10,
                text: '理論的な均衡取引数量(' + (Math.floor(usersCount / 4)) + ')'
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
            name: '需要',
            step: 'right',
            data: buyerBids.sort((a, b) => a - b).map((x, y, a) => [x, a.length - y])
          }, {
            animation: false,
            name: '供給',
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
            text: "成立価格の推移"
          },
          xAxis: {
            title: {
              text: '成立順'
            },
            min: 1,
            max: dealtCount + 2,
            tickInterval: 1,
            reversed: false,
            plotLines: [{
              color: 'black',
              dashStyle: 'dot',
              width: 2,
              value: usersCount / 4,
              label: {
                rotation: 0,
                y: 15,
                x: -10,
                align: 'right',
                text: '理論的な均衡取引数量(' + (Math.floor(usersCount / 4)) + ')'
              },
              zIndex: 99
            }]
          },
          yAxis: {
            title: {
              text: '価格'
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
                text: '理論的な均衡価格(' + (usersCount * 50) + '～' + (usersCount * 50 + 100) + ')'
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
            name: '成立価格',
            data: dealtlog
          }]
        }} />
    </CardText>
  </Card>
  )
}

export default throttle(Chart, 500)

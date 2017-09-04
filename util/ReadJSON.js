import React from 'react'

export function ReadJSON() {
  if(typeof ReadJSON.text === 'undefined') ReadJSON.text = require('json!./language.json')
  return ReadJSON.text
}

export function LineBreak(text) {
  var regex = /(\n)/g
  return text.split(regex).map(function (line) {
    if (line.match(regex)) {
      return React.createElement('br')
    }
    else {
      return line
    }
  })
}

export function SplitAndInsert(text, dynamic_text) {
  var split = text.match(/<[^<^>]+>/g)
  var strings = text.split(/<[^<^>]+>/g)
  for(let i = 0; i < split.length; i++) {
        let temp = dynamic_text
        let value = split[i].slice(1, split[i].length - 1).split(/[\s　]*,[\s　]*/)
        for(let i = 0; i < value.length; i++){
          temp = temp[value[i]]
        }
        strings[i] += temp? temp : split[i]
  }
  return LineBreak(strings.join(""))
}

export function InsertVariable(text, variables, dynamic_variables) {
  if(dynamic_variables) Object.assign(variables, dynamic_variables)
  Object.keys(variables).forEach(key => text = text.split('<' + key + '>').join(variables[key]))
  return text;
}
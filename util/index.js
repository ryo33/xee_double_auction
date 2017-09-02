import { ReadJSON } from '../util/ReadJSON'

export function getPage(mode) {
  switch(mode) {
    case 'wait':
      return ReadJSON().static_text["pages"][0]
    case 'description':
      return ReadJSON().static_text["pages"][1]
    case 'auction':
      return ReadJSON().static_text["pages"][2]
    case 'result':
      return ReadJSON().static_text["pages"][3]
    default:
      return mode
  }
}

export function getExperimentType(type) {
  switch(type) {
    case 'simple':
      return ReadJSON().static_text["simple"]
    case 'real':
      return ReadJSON().static_text["real"]
    default:
      return type
  }
}

export function getRole(role) {
  switch (role) {
    case 'buyer':
      return ReadJSON().static_text["roles"][0]
    case 'seller':
      return ReadJSON().static_text["roles"][1]
    default:
      return ReadJSON().static_text["roles"][2]
  }
}

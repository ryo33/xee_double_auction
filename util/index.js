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

export function getRole(role, dynamic_text) {
  switch (role) {
    case 'buyer':
      return dynamic_text["variables"]["buyer"]
    case 'seller':
      return dynamic_text["variables"]["seller"]
    default:
      return ReadJSON().static_text["roles"]
  }
}

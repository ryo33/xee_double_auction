import React, { Component } from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'

const EditQuestion = ({ style, disabled }) => {
  return (
    <span>
      <FloatingActionButton onClick={null} style={style} disabled={disabled}>
        <ImageEdit />
      </FloatingActionButton>
    </span>
  )
}

export default EditQuestion

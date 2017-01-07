import React from 'react'

import download from 'datauri-download'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'

const DownloadButton = ({ fileName, list, style, disabled }) => (
  <FloatingActionButton
    style={style}
    disabled={disabled}
    onClick={() => {
      const content = list.map(line => line.join(',')).join("\n")
      download(fileName, 'text/csv;charset=utf-8', content)
    }}
  >
    <FileFileDownload />
  </FloatingActionButton>
)

  export default DownloadButton

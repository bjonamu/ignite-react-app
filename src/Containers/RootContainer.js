module.exports = `import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppNavigation from '../Navigation/AppNavigation'

class RootContainer extends Component {
  render () {
    return <AppNavigation />
  }
}

export default connect(null, null)(RootContainer)
`

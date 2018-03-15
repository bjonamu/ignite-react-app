module.exports = `import React from 'react'
import Helmet from 'react-helmet'

import Colors from '../Themes/Colors'
import Page from '../Components/Page'

export default () => (
  <Page background={Colors.snow}>
    <Helmet title='Next Page' />
  </Page>
)
`

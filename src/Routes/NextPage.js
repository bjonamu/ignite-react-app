module.exports = `import styled from 'styled-components'
import Colors from '../../Themes/Colors'

export default styled.section\`
  background: ${props => props.backgroundColor || Colors.snow};
  height: 100%;
\`
`
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

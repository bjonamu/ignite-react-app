module.exports = `import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Wrapper from '../Components/Wrapper'

export default () => (
  <Wrapper>
    <Link to='/'>
      <p>Whoops! Nothing to see here!</p>
    </Link>
    <Helmet title='404' />
  </Wrapper>
)`

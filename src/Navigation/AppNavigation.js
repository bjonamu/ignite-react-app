module.exports = `import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

// Custom
import AppConfig from '../Config/AppConfig'
import Routes from './Routes'
import Wrapper from '../Components/Wrapper'
import NoMatch from '../Routes/NoMatch'

const AppNavigation = () => (
  <Router>
    <Wrapper>
      <Helmet
        defaultTitle={AppConfig.appName}
        titleTemplate={\`AppConfig.appName  | %s\`}
      />
      <Switch>
        {Routes.map((route, i) => <Route key={i} {...route} />)}
        <Route component={NoMatch} />
      </Switch>
    </Wrapper>
  </Router>
)

export default AppNavigation
`

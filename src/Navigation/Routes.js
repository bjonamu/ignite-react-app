module.exports = `'use-scrict'

import Loadable from 'react-loadable'
import Loading from './Loading'
import LandingPage from '../Routes/LandingPage'

const AsyncNextPage = Loadable({
  loader: () => import('../Routes/NextPage'),
  loading: Loading
});

const routes = [
  {
    title: 'LandingPage',
    path: '/',
    component: LandingPage,
    exact: true
  },
  {
    title: 'NextPage',
    path: '/next-page',
    component: AsyncNextPage,
    exact: true
  }
]

export default routes
`

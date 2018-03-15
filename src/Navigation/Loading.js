module.exports = `import React from 'react'

export default (props) => {
  if (props.error) {
    // When the loader has errored
    return <div>Sorry, there was a problem loading the page.</div>
  }
  // else if (props.pastDelay) {
  //   // When the loader has taken longer than the delay
  //   return <div>Loading...</div>
  // }
  return null
}
`

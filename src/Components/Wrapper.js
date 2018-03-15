module.exports = `import styled from 'styled-components'
import Colors from '../Themes/Colors'

export default styled.section\`
  background: \${props => props.backgroundColor || Colors.snow};
  height: 100%;
  width: 100%;
\``

module.exports = `// Used via Metrics.baseMargin
const metrics = {
  baseMargin: '10px',
  doubleBaseMargin: '20px',
  smallMargin: '5px',
  navBarHeight: '50px',
  padding: {
    baseVertical: '6px',
    baseHorizontal: '12px',
    lgVertical: '10px',
    lgHorizontal: '16px',
    smVertical: '5px',
    smHorizontal: '10px',
    xsVertical: '1px',
    xsHorizontal: '5px'
  },
  icons: {
    tiny: '15px',
    small: '18px',
    medium: '27px',
    large: '45px',
    xl: '60px'
  },
  images: {
    small: '20px',
    medium: '40px',
    large: '60px',
    logo: '300px'
  },
  borderRadius: {
    base: '4px',
    large: '6px',
    small: '3px'
  },
  // -- Z-index master list
  //
  // Warning: Avoid customizing these values. They're used for a bird's eye view
  // of components dependent on the z-axis and are designed to all work together.
  zIndex: {
    navbar: 1000,
    dropdown: 1000,
    popover: 1060,
    tooltip: 1070,
    navbarFixed: 1030,
    modalBackground: 1040,
    modal: 1050
  }
}

export default metrics
`

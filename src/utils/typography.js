import Typography from 'typography'
import altonTheme from 'typography-theme-alton'
altonTheme.baseFontSize = '15px'
altonTheme.overrideThemeStyles = (options) => ({
  'a': {
  color: '#8fc744',
  }
})

const typography = new Typography(altonTheme)

export default typography;

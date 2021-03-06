import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import { kebabCase } from 'lodash'
import { Container } from 'react-responsive-grid'
import PropTypes from "prop-types"
import { rhythm, scale } from '../utils/typography'
import logoPic from '../components/logo.jpg'
import './index.css'
import { slide as Menu } from 'react-burger-menu'




class Template extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange (state) {
      this.setState({menuOpen: state.isOpen})
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
      this.setState({menuOpen: false})
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons



  static childContextTypes = {
        setPosts: PropTypes.func,
      }

      getChildContext() {
        return {
          setPosts: posts => {
            this.posts = posts
          },
        }
      }

      showSettings (event) {
    event.preventDefault();
  }

  render() {
    const {data: { allMarkdownRemark: { group } } } = this.props;
    const { location, children } = this.props
    let header


if (typeof window !== `undefined`) {

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-55px";
        }
    }
}


      header = (
        <div>
        <div id="navbar">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="header">
        <div className="menu-container">
          <Menu isOpen={this.state.menuOpen}onStateChange={(state) => this.handleStateChange(state)}>
            {group.map(category => (
              <li style={{ listStyleType:'none', marginRight: '1rem',}} key={category.fieldValue}>
                <Link to={`/category/${kebabCase(category.fieldValue)}/`} activeStyle={{color: '#8fc744'}} style={{boxShadow:'none', textTransform:'uppercase',}} onClick={() => this.closeMenu()} >
                  {category.fieldValue}
                </Link>
              </li>
            ))}
         </Menu>

       </div>
       <div>
          <div>
            <Link to={'/'}>
              <img
                src={logoPic}
                alt={'Hilltops Phoenix'}
                className="logo"
              />
            </Link>
          </div>
          <div className="sub-menu">
                {group.map(category => (
                  <li style={{ display:'inline', textDecoration:'none', listStyleType:'none', marginRight: '1rem',}} key={category.fieldValue}>
                    <Link to={`/category/${kebabCase(category.fieldValue)}/`} activeStyle={{color: '#8fc744'}} style={{boxShadow:'none', textTransform:'uppercase',}}>
                      {category.fieldValue}
                    </Link>
                  </li>
                ))}
          </div>
        </div>
      </div>
</div>
      )

    return (
        <div>
        {header}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
        {children()}
      </div>
      </div>
    )
  }
}

export default Template

export const indexPageQuery = graphql`
  query categoryLinksQuery {
    allMarkdownRemark{
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`

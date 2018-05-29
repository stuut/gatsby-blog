import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

export default ({ data }) => {
  console.log(data);

  return (
    <div>
    <Helmet title={data.site.siteMetadata.title} />
      <div>
        <h2 style={{paddingLeft:'1rem', paddingTop:'1rem'}}>GARDENING</h2>
        <div className="row" >
          {data.gardening.edges.map(({ node }) => (
            <div className='card'>
             <div>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                <div key={node.id}>
                <Img resolutions={node.frontmatter.mainImage.childImageSharp.resolutions} style={{ width: '100%', paddingBottom:'66.6667%',}}/>
                <div className="postText">
                  <p className="tab">{node.frontmatter.date}</p>
                  <h3>{node.frontmatter.title}{" "}</h3>
                  <p>{node.excerpt}</p>
                </div>
                </div>
               </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
      <h2 style={{paddingLeft:'1rem', paddingTop:'1rem'}}>SUSTAINABILITY</h2>
      <div className="row" >
        {data.sustainability.edges.map(({ node }) => (
          <div className='card'>
           <div>
            <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
              <div key={node.id}>
              <Img resolutions={node.frontmatter.mainImage.childImageSharp.resolutions} style={{ width: '100%', paddingBottom:'66.6667%',}}/>
              <div className="postText">
                <p className="tab">{node.frontmatter.date}</p>
                <h3>{node.frontmatter.title}{" "}</h3>
                <p>{node.excerpt}</p>
              </div>
              </div>
             </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
      <div>
      <h2 style={{paddingLeft:'1rem', paddingTop:'1rem'}}>LANDSCAPING</h2>
      <div className="row" >
        {data.landscaping.edges.map(({ node }) => (
          <div className='card'>
           <div>
            <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
              <div key={node.id}>
              <Img resolutions={node.frontmatter.mainImage.childImageSharp.resolutions} style={{ width: '100%', paddingBottom:'66.6667%',}}/>
              <div className="postText">
                <p className="tab">{node.frontmatter.date}</p>
                <h3>{node.frontmatter.title}{" "}</h3>
                <p>{node.excerpt}</p>
              </div>
              </div>
             </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata{
        title
      }
    }

        gardening: allMarkdownRemark(
          limit: 3
          sort: { fields: [frontmatter___date], order: DESC }
          filter:{ frontmatter: {category: {eq: "gardening"}}}
          ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {

                date(formatString: "DD MMMM, YYYY")
                title
                category
                mainImage {
                  childImageSharp {
                    resolutions(width: 300 quality: 70) {
                      src
                      srcSet
                      base64

                    }
                  }
                }
              }

            }
          }
    		}
        landscaping: allMarkdownRemark(
            limit: 3
            sort: { fields: [frontmatter___date], order: DESC }
            filter:{ frontmatter: {category: {eq: "landscaping"}}}
            ) {
            edges {
              node {
                excerpt
                fields {
                  slug
                }
                frontmatter {

                  date(formatString: "DD MMMM, YYYY")
                  title
                  category
                  mainImage {
                    childImageSharp {
                      resolutions(width: 300 quality: 70) {
                        src
                        srcSet
                        base64

                      }
                    }
                  }
                 }

              }
            }
          }
          sustainability: allMarkdownRemark(
                limit: 3
                sort: { fields: [frontmatter___date], order: DESC }
                filter:{ frontmatter: {category: {eq: "sustainability"}}}
                ) {
                edges {
                  node {
                    excerpt
                    fields {
                      slug
                    }
                    frontmatter {

                      date(formatString: "DD MMMM, YYYY")
                      title
                      category
                      mainImage {
                        childImageSharp {
                          resolutions(width: 300 quality: 70) {
                            src
                            srcSet
                            base64

                          }
                        }
                      }
                     }

                  }
                }
              }

  }
`

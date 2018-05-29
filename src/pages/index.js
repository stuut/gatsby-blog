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
        <h2>GARDENING</h2>
        <div style = {{display:'flex'}}>
          {data.gardening.edges.map(({ node }) => (
            <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
              <div key={node.id}>
              <Img sizes={node.frontmatter.mainImage.childImageSharp.sizes}/>
                <h3>
                  {node.frontmatter.title}{" "}
                  <p>{node.frontmatter.date}</p>
                </h3>
                <p>{node.excerpt}</p>
              </div>
             </Link>
           ))}
        </div>
      </div>
      <div>
        <h2>SUSTAINABILITY</h2>
        {data.sustainability.edges.map(({ node }) => (
          <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
            <div key={node.id}>
            <Img sizes={node.frontmatter.mainImage.childImageSharp.sizes}/>
              <h3>
                {node.frontmatter.title}{" "}
                <p>{node.frontmatter.date}</p>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <h2>LANDSCAPING</h2>
        {data.landscaping.edges.map(({ node }) => (
          <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
            <div key={node.id}>
            <Img sizes={node.frontmatter.mainImage.childImageSharp.sizes}/>
              <h3>
                {node.frontmatter.title}{" "}
                <p>{node.frontmatter.date}</p>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          </Link>
        ))}
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
                    sizes(maxWidth: 768,) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }

            }
          }
    		}
        landscaping: allMarkdownRemark(
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
                      sizes(maxWidth: 768, ) {
                        ...GatsbyImageSharpSizes
                      }
                    }
                  }
                 }

              }
            }
          }
          sustainability: allMarkdownRemark(
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
                          sizes(maxWidth: 768,) {
                            ...GatsbyImageSharpSizes
                          }
                        }
                      }
                     }

                  }
                }
              }

  }
`

const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const slash = require(`slash`)
const slugify = require(`limax`)

exports.onCreateNode = ({
  node, getNode, getNodes, boundActionCreators,
}) => {
  const { createNodeField, createParentChildLink } = boundActionCreators;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'blog' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    // Attach thumbnail's ImageSharp node by public path if necessary
    if (typeof node.frontmatter.mainImage === 'string') {
      // Find absolute path of linked path
      const pathToFile = path
        .join(__dirname, 'static', node.frontmatter.mainImage)
        .split(path.sep)
        .join('/');

      // Find ID of File node
      const fileNode = getNodes().find(n => n.absolutePath === pathToFile);

      if (fileNode != null) {
        // Find ImageSharp node corresponding to the File node
        const imageSharpNodeId = fileNode.children.find(n => n.endsWith('>> ImageSharp'));
        const imageSharpNode = getNodes().find(n => n.id === imageSharpNodeId);

        // Add ImageSharp node as child
        createParentChildLink({ parent: node, child: imageSharpNode });
      }
    }
  }
};


// convert a string like `/some/long/path/name-of-docs/` to `name-of-docs`
const slugToAnchor = slug =>
  slug
    .split(`/`) // split on dir separators
    .filter(item => item !== ``) // remove empty values
    .pop() // take last item


exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagTemplate = path.resolve('./src/templates/tags.js')
    const categoryTemplate = path.resolve('./src/templates/category.js')
    const contributorPageTemplate = path.resolve(`./src/templates/template-contributor-page.js`)


    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                    category
                  }
                }
              }
            }
            allAuthorYaml {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }

          }
       `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        // Create blog posts pages.

        const posts = result.data.allMarkdownRemark.edges

        _.each(posts, (post, index) => {

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
            },
          })
        })

        // Create contributor pages.
        result.data.allAuthorYaml.edges.forEach(edge => {
          createPage({
            path: `${edge.node.fields.slug}`,
            component: slash(contributorPageTemplate),
            context: {
              slug: edge.node.fields.slug,
            },
          })
        })



        // Tag pages:
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
          if (_.get(edge, `node.frontmatter.tags`)) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags)

        // Make tag pages
        tags.forEach(tag => {
          const tagPath = `/tags/${_.kebabCase(tag)}/`

          createPage({
            path: tagPath,
            component: tagTemplate,
            context: {
              tag,
            },
          })
        })
        // category pages:
        let category = []
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
          if (_.get(edge, `node.frontmatter.category`)) {
            category = category.concat(edge.node.frontmatter.category)
          }
        })
        // Eliminate duplicate tags
        category = _.uniq(category)

        // Make tag pages
        category.forEach(category => {
          const categoryPath = `/category/${_.kebabCase(category)}/`

          createPage({
            path: categoryPath,
            component: categoryTemplate,
            context: {
              category,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  } else if (node.internal.type === `AuthorYaml`) {
    slug = `/contributors/${slugify(node.id)}/`
    createNodeField({ node, name: `slug`, value: slug })
  }


}

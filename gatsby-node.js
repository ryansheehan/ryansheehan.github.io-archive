const path = require(`path`)
const slugify = require('slugify');
// const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const projectPost = path.resolve(`./src/templates/project-posts.js`);
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fields: { draft: { eq: false } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                project
                isProjectSummary
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    // posts.filter(post => !post.node.fields.isProjectSummary).forEach((post, index) => {
    //   const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    //   const next = index === 0 ? null : posts[index - 1].node;

    //   createPage({
    //     path: post.node.fields.slug,
    //     component: blogPost,
    //     context: {
    //       slug: post.node.fields.slug,
    //       previous,
    //       next,
    //     },
    //   });
    // });

    const projects = posts.reduce((collection, post) => {
      const {isProjectSummary, project} = post.node.fields;

      if (project in collection) {
        if (isProjectSummary) {
          collection[project].summary = post;
        } else {
          collection[project].posts.push(post);
        }
      } else {
        const projectMeta = {posts: [], summary: undefined};
        if (isProjectSummary) {
          projectMeta.summary = post;
        } else {
          projectMeta.posts.push(post);
        }
        collection[project] = projectMeta;
      }

      return collection;
    }, {});

    Object.keys(projects).sort().forEach((key, pIndex, projectKeys) => {
      const project = projects[key];
      const {posts} = project;
      const previousProject = pIndex === projectKeys.length - 1 ? null : projects[projectKeys[pIndex + 1]].node;
      const nextProject = pIndex === 0 ? null : projects[projectKeys[pIndex - 1]].node

      posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        });
      });

      createPage({
        path: project.summary.node.fields.slug,
        component: projectPost,
        context: {
          slug: project.summary.node.fields.slug,
          project: key,
          previous: previousProject,
          next: nextProject
        }
      });
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const {name: fileName, relativeDirectory: projectPath} = fileNode;
    const project = projectPath.split('/')[0];
    // console.log(`\n${JSON.stringify(fileNode, undefined, 2)}\n`);

    // const value = createFilePath({ node, getNode, trailingSlash: false })
    // console.log(`\ncreateFilePath: ${value}\n`);

    const isProjectSummary = fileName === '_index';
    const projectSlug = slugify(project);
    const slug = isProjectSummary ? `/${projectSlug}` : `/${projectSlug}/${slugify(fileName)}`;

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });

    createNodeField({
      name: `project`,
      node,
      value: project
    });

    createNodeField({
      name: `isProjectSummary`,
      node,
      value: isProjectSummary
    })
  }
}

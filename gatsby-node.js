const path = require('path');
const fs = require('fs');
// const { createFilePath } = require('gatsby-source-filesystem');
const slugify = require('slugify');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const timeline = path.resolve(`./src/templates/blog-post.tsx`);
  const {data, errors} = await graphql(
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
                series
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (errors) {
    throw errors;
  }

  // Create blog posts pages.
  const {edges: posts} = data.allMarkdownRemark;

  // group posts by series, and collect series header-posts
  const {seriesList, ...collections} = posts.reduce((seriesDict, post) => {
    const {series} = post.node.fields;
    if (series) {
      if (series in seriesDict) {
        seriesDict[series].push(post);
      } else {
        seriesDict[series] = [post];
      }
    } else {
      seriesDict.seriesList.push(post);
    }

    return seriesDict;
  }, {seriesList: []});

  // Create post pages
  Object.values(collections).forEach(collection =>
    collection.forEach((post, index, posts) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      const { slug } = post.node.fields;

      createPage({
        path: slug,
        component: timeline,
        context: { slug, previous, next }
      });
    }
  ));

  // Todo: Create series pages

  return null

}

const getSlug = (function(){
  const cache = {};
  return function(str) {
    let slug = cache[str];
    if (!slug) {
      slug = slugify(str);
      cache[str] = slug;
    }
    return slug;
  };
})();

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const {name: fileName, relativeDirectory: seriesPath} = fileNode;
    const fileSlug = getSlug(fileName);
    const pathSlugs = seriesPath.split(path.sep).map(s => getSlug(s));
    let series = pathSlugs[pathSlugs.length - 1];
    let slug = pathSlugs.join('/');
    if (fileSlug !== 'index' && fileSlug !== series) {
      slug = `${slug}/${fileSlug}`;
    } else {
      series = '';
    }

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });
    createNodeField({
      name: 'series',
      node,
      value: series
    });
  }
}

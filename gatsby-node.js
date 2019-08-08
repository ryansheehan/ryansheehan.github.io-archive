const path = require('path');
const fs = require('fs');
// const { createFilePath } = require('gatsby-source-filesystem');
const slugify = require('slugify');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // create posts
  const {data, errors} = await graphql(
    `{
      seriesInfo: allMarkdownRemark(filter: {fields: {isSeriesMeta: {eq: true}, draft: {eq: false}}}, sort: {fields: [fields___sortPriority, frontmatter___title], order: [ASC, ASC]}) {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
              series
              sortPriority
            }
          }
        }
      }
      postsBySeries: allMarkdownRemark(sort: {fields: [fields___sortPriority, frontmatter___date], order: [ASC, DESC]}, filter: {fields: {isSeriesMeta: {eq: false}, draft: {eq: false}}}) {
        group(field: fields___series) {
          edges {
            node {
              html,
              frontmatter {
                title
                date
              }
              fields {
                sortPriority
                slug
                series
                post
              }
            }
          }
        }
      }
    }`
  );

  if (errors) { throw errors; }

  const {seriesInfo: seriesInfoRaw, postsBySeries: postsBySeriesRaw} = data;

  // make the series info easier to use as a cache
  const seriesMeta = seriesInfoRaw.edges.reduce((seriesInfo, edge) => {
    const {frontmatter, fields} = edge.node;
    const {title} = frontmatter;
    const {slug, series: seriesKey, sortPriority} = fields;

    seriesInfo[seriesKey] = {
      title,
      slug,
      sortPriority
    }

    return seriesInfo;
  }, {});

  // make sure no posts should be filtered out because the series is marked as a draft
  const postsBySeries = postsBySeriesRaw.group.filter(g => g.edges[0].node.fields.series in seriesMeta);

  // get the post template file
  const postTemplate = path.resolve('./src/templates/blog-post.tsx');

  // create the posts, and find related posts by order to setup previous and next links
  postsBySeries.forEach(seriesPosts => {
    seriesPosts.edges.forEach((post, index, posts) => {
      const previousNode = index === posts.length - 1 ? null : posts[index + 1].node;
      const nextNode = index === 0 ? null : posts[index - 1].node;
      const { slug } = post.node.fields;

      const next = !nextNode ? null : {
        link: nextNode.fields.slug,
        title: nextNode.frontmatter.title
      };

      const previous = !previousNode ? null : {
        link: previousNode.fields.slug,
        title: previousNode.frontmatter.title
      };

      createPage({
        path: slug,
        component: postTemplate,
        context: { slug, previous, next }
      })
    });
  });

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
    const { frontmatter, parent: parentNode } = node;
    const {
      sourceInstanceName,
      name: rawPostname,
      relativeDirectory: seriesKey
    } = getNode(parentNode);
  
    if (sourceInstanceName === 'series') {
      const isSeriesMeta = rawPostname === 'index' || rawPostname === seriesKey;
      const [, priorityStr, postName] = rawPostname.match(/(^\d+-)?(.+$)/);
      const priority = parseInt(frontmatter.priority) || parseInt(priorityStr) || 9999;
      const postSlug = getSlug(postName);
      const seriesSlug = getSlug(seriesKey);
      const fullSlug = isSeriesMeta ? seriesSlug : `${seriesSlug}/${postSlug}`;

      createNodeField({
        name: 'isSeriesMeta',
        node,
        value: isSeriesMeta
      });

      createNodeField({
        name: 'sortPriority',
        node,
        value: priority
      });

      createNodeField({
        name: 'slug',
        node,
        value: fullSlug
      });

      createNodeField({
        name: 'series',
        node,
        value: seriesSlug
      });

      createNodeField({
        name: 'post',
        node,
        value: postSlug
      });
    }
  }
}

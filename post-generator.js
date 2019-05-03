#!/usr/bin/env node

// 3rd party libraries
const slugify = require('slugify');
const yaml = require('js-yaml');
const deepmerge = require('deepmerge');

// node libraries
const fs = require('fs');
const path = require('path');
const util = require('util');
const process = require('process');

// convert to promise-based functions
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

// get the input args
const inputArgs = process.argv.splice(2);

// test for help
if (inputArgs.length == 0 || inputArgs.some(v => v === '--help' || v === '-h')) {
  console.log(`post-generator.js
Generates a new blog post based on title

node post-generate.js <title> [template] [<key> <value> ...]

Arguments:

  title:
    Quoted string for the blog title.  A single word title require no quotes.

  template:
    The name of a template.frontmatter.js file without the .frontmatter.js
    extension.  A .frontmatter.js file exports an object that maps to the yaml
    for the frontmatter block of the markdown file.

  key and value:
    Overrides any properties defined in the frontmatter.
    Use ___ (three underscores) in the key to define nested yaml properties.
  `
  );

  return 0;
}

// parse out inputs
const [postTitle, templateName, ...args] = inputArgs;

// hard-coded posts directory
const postRootDirectory = path.resolve(__dirname, 'content', 'blog');

// formateTitle tries to intelligently capitalize the words of the title
function formatTitle(rawTitle) {
  const capitalize = w => w.charAt(0).toUpperCase() + w.slice(1);
  const skipWords = new Set('a an the for and nor but or yet so by from of on to with without at'.split(' '));
  return rawTitle.split(' ')
  .map((word, index, words) => {
    if (index === 0 || index === words.length - 1) {
      return capitalize(word);
    } else if (skipWords.has(word)) {
      return word;
    }
    return capitalize(word);
  }).join(' ');
}

// converts the script arguments into something usable
function resolveArguments(templateName, postTitle, args = []) {
  let template = {};

  if (templateName) {
    const templateFile = path.resolve(__dirname, `${templateName}.frontmatter.js`);
    console.log(templateFile);
    if (fs.existsSync(templateFile)) {
      template = require(templateFile);
    }
  }

  const slug = slugify(postTitle).toLowerCase();
  const overrides = [];

  // take the variable arguments and mash them up into a single nested object
  for(let k=0, v=1; k < args.length; k += 2, v += 2) {
    const value = args[v];
    const valueObject = args[k].split('___').reverse().reduce((o, part, i)=>{
      if (i === 0) {
        o[part] = value;
        return o;
      }

      return {[part]: o};
    }, {});
    overrides.push(valueObject);
  }

  return {
    template,
    slug,
    overrides: deepmerge.all(overrides)
  }
}

// creates the directory, or throws if already exists
async function createPostDirectory(postRoot, slug) {
  const postdir = path.join(postRoot, slug);

  if(fs.existsSync(postdir)) {
    throw new Error(`Post "${slug}" already exists in "${postRoot}".`);
  }

  await mkdir(postdir);

  return postdir;
}

// create the initial markdown file, complete with frontmatter
async function createPost(filePath, template, rawTitle, overrides) {
  const title = formatTitle(rawTitle);

  const frontmatter = deepmerge(
    {
      title,
      date: (new Date()).toISOString(),
      draft: true,
      description: `${title} description`,
      ...template,
    },
    overrides
  );

  const contents =
`---
${yaml.safeDump(frontmatter)}---

`;

  await writeFile(filePath, contents);
}

// main function
async function processNewPost(postRoot, templateName, postTitle, args = []) {
  const {template, slug, overrides} = resolveArguments(templateName, postTitle, args);
  const postdir = await createPostDirectory(postRoot, slug);
  const postFilePath = path.resolve(postdir, `${slug}.md`);
  await createPost(postFilePath, template, postTitle, overrides);
  console.log(`'${postTitle}' is ready to edit at "${postFilePath}"`);
}

// call the main function
try {
  processNewPost(postRootDirectory, templateName, postTitle, args)
} catch (err) {
  console.error(`${err}`);
  return 1;
}
return 0;








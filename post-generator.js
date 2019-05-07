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

node post-generate.js <project/post> [project-slug] <title> [--template <name>] [<key> <value> ...]

Arguments:

  project/post:
    Defining a new project or post

  post:
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

// parse out project template
const templateIndex = inputArgs.findIndex(value => value === '--template');
let templateName = '';
let templateFile = '';
if (templateIndex > -1) {
  templateName = inputArgs[templateIndex+1];
  templateFile = `${templateName}.frontmatter.js`
  inputArgs.splice(templateIndex, 2);
}

const [newType, ...restArgs] = inputArgs;

let projectName = '';
let projectSlug = '';
let postName = '';
let postSlug = '';
let args = [];

switch(newType.toLowerCase()) {
  case 'project':
  [projectName, ...args] = restArgs;
  projectSlug = slugify(projectName.toLowerCase());
  break;
  case 'post':
  [projectSlug, postName, ...args] = restArgs;
  postSlug = slugify(postName.toLowerCase());
  break;
  default:
  console.error(`"${newType}" is not a valid new type.`);
  return 1;
}

// hard-coded posts directory
const contentRootDirectory = path.resolve(__dirname, 'content');

// formateTitle tries to intelligently capitalize the words of the title
function formatTitle(rawTitle) {
  if (!rawTitle) {
    return '';
  }

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

const projectTitle = formatTitle(projectName);
const postTitle = !!projectName ? '' : formatTitle(postName);

console.log(`
Generating with parameters:
  Type: ${newType}
  Project Name: ${projectName}
  Project Title: ${projectTitle}
  Project Slug: ${projectSlug}
  Post Name: ${postName}
  Post Title: ${postTitle}
  Post Slug: ${postSlug}
  Template: ${templateName}
  Template File: ${templateFile}
  Content Root: ${contentRootDirectory}
  Args: ${JSON.stringify(args)}
`);

// converts the script arguments into something usable
function resolveTemplateAndArguments(templateFile, args) {
  let template = [];

  if (templateFile) {
    const templateFilePath = path.resolve(__dirname, templateFile);
    if (fs.existsSync(templateFilePath)) {
      template = [require(templateFilePath)];
    } else if(!!templateFile) {
      console.warn(`Template file "${templateFilePath}" not found.`);
    }
  }

  const overrides = [...template];

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

  return deepmerge.all(overrides);
}

function createBasicMetadata(title, project) {
  return {title, date: (new Date()).toISOString(), description: `${title} description`, project };
}

// create the initial markdown file, complete with frontmatter
async function createMarkdown(filePath, frontmatter) {
  const contents =
`---
${yaml.safeDump(frontmatter)}---

`;

  await writeFile(filePath, contents);
}

async function createProject(contentRoot, slug, title, metadata) {
  const projectDir = path.join(contentRoot, slug);

  if (fs.existsSync(projectDir)) {
    console.log(`Project "${slug}" exists at ${projectDir}`);
    return projectDir;
  }

  await mkdir(projectDir);

  const defaultMetadata = createBasicMetadata(title, slug);
  const additionalMetadata = metadata;

  const projectMetadata = deepmerge(defaultMetadata, additionalMetadata);
  const projectFile = path.join(projectDir, '_index.md');

  await createMarkdown(projectFile, projectMetadata);

  return projectFile;
}

async function createPost(contentRoot, projectSlug, slug, title, metadata) {
  const projectDir = path.join(contentRoot, projectSlug);

  if (!fs.existsSync(projectDir)) {
    console.error(`Project slug "${projectSlug}" does not exist.  Please create project first.`);
    return 1;
  }

  const postDir = path.join(projectDir, slug);
  await mkdir(postDir);

  const postMetadata = deepmerge.all([{draft: true}, createBasicMetadata(title, slug), metadata]);
  const postPath = path.join(postDir, slug);

  await createMarkdown(postPath, postMetadata);

  return postPath;
}

// call the main function
try {
  const addedMetadata = resolveTemplateAndArguments(templateFile, args);
  switch(newType) {
    case 'project':
    createProject(contentRootDirectory, projectSlug, projectTitle, addedMetadata).then(path => {
      console.log(`Project file created at ${path}`);
    });
    break;
    case 'post':
    createPost(contentRootDirectory, projectSlug, postSlug, postTitle, addedMetadata).then(path => {
      console.log(`Post file created at ${path}`);
    });
    break;
  }
} catch (err) {
  console.error(`${err}`);
  return 1;
}
return 0;








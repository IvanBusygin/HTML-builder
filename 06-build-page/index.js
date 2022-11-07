const path = require('path');
const P = require('fs/promises');

const template = path.join(__dirname, 'template.html');
const templateComponents = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');

const dist = path.join(__dirname, 'project-dist');
const htmlBundle = path.join(dist, 'index.html');
const cssBundle = path.join(dist, 'style.css');
const assetsCopy = path.join(dist, 'assets');

(async () => {
  try {
    await P.rm(dist, {recursive: true, force: true});
    await P.mkdir(dist);
    await makeHtml(template, templateComponents, htmlBundle);
    await makeCss(stylesFolder, cssBundle);
    await copyAssets(assetsFolder, assetsCopy);
  } catch (err) {
    console.log(err);
  }
})();

async function makeHtml(template, components, bundle) {
  let fileTemplate = await P.readFile(template, 'utf-8');
  const tags = getTemplateTags(fileTemplate);
  for (const tag of tags) {
    fileTemplate = fileTemplate.replace(`{{${tag}}}`, await getContent(components, tag));
  }
  await P.writeFile(bundle, fileTemplate);
}

function getTemplateTags(file) {
  const arrTags = [];
  let start = 0;
  let end = 0;
  while (start >= 0 && end >= 0) {
    start = file.indexOf('{{', end);
    end = file.indexOf('}}', end + 2);
    if (start >= 0 && end > 0) {
      const tag = file.slice(start + 2, end);
      arrTags.push(tag);
    }
  }
  return arrTags;
}

async function getContent(components, tag){
  try {
    const filePath = path.join(components, `${tag}.html`);
    return await P.readFile(filePath, 'utf-8');
  } catch (err) {
    console.log(`The template file ${tag} does not exist.`);
  }
}

async function makeCss(folder, bundle) {
  const arrFiles = await P.readdir(folder);
  for (const fileName of arrFiles) {
    const filePath = path.join(folder, fileName);
    const isFile = (await P.stat(filePath)).isFile();
    const isCSS = path.parse(filePath).ext === '.css';
    if (isFile && isCSS) {
      const fileCSS = await P.readFile(filePath, 'utf-8');
      await P.appendFile(bundle, fileCSS);
    }
  }
}

async function copyAssets(folder, copyFolder) {
  const arrFiles = await P.readdir(folder);
  if (arrFiles.length !== 0) {
    await P.mkdir(copyFolder);
    for (const item of arrFiles) {
      const itemPath = path.join(folder, item);
      const copyPath = path.join(copyFolder, item);
      const stats = await P.stat(itemPath);
      if (stats.isFile()) {
        await P.copyFile(itemPath, copyPath);
      } else if (stats.isDirectory()) {
        await copyAssets(itemPath, copyPath);
      }
    }
  }
}

// Runs after both client and SSR builds: injects the rendered app into dist/index.html, then drops the SSR bundle.
import {readFileSync, writeFileSync, rmSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {render}=await import(pathToFileURL('dist/server/entry-server.js').href);
const html=readFileSync('dist/index.html','utf8');
const out=html.replace('<div id="root"></div>','<div id="root">'+render()+'</div>');
if(out===html) throw new Error('root placeholder not found');
writeFileSync('dist/index.html',out);
rmSync('dist/server',{recursive:true,force:true});
console.log('prerendered dist/index.html');

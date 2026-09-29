import {defineConfig, loadEnv} from 'vite';
import {writeFileSync, readFileSync, existsSync} from 'node:fs';

// ponytail: one env var (VITE_SITE_URL) drives canonical, absolute share URLs, sitemap and robots.
// Leave it empty until the domain exists; nothing breaks, those tags are simply not emitted.
export default defineConfig(({mode})=>{
  const env=loadEnv(mode,process.cwd(),'');
  const site=(env.VITE_SITE_URL||'').replace(/\/+$/,'');
  return {
    build:{target:'es2020',reportCompressedSize:false},
    plugins:[{
      name:'pixel-union-site-url',
      transformIndexHtml(html){
        if(!site) return html;
        html=html.replace(/(content=")\/(pixel-union-[^"]+)"/g,'$1'+site+'/$2"')            // og/twitter images
                 .replace(/"(logo|image)":"\/(pixel-union-[^"]+)"/g,'"$1":"'+site+'/$2"')    // JSON-LD
                 .replace('"@type":"Organization",','"@type":"Organization","url":"'+site+'/",')
                 .replace('<!-- TODO: once the public domain is known, add <link rel="canonical"> and make og:image, logo and image URLs absolute -->',
                          '<link rel="canonical" href="'+site+'/"/><meta property="og:url" content="'+site+'/"/>');
        return html;
      },
      closeBundle(){
        if(!site||!existsSync('dist')) return;
        const today=new Date().toISOString().slice(0,10);
        writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+site+'/</loc><lastmod>'+today+'</lastmod></url></urlset>\n');
        const robots=existsSync('dist/robots.txt')?readFileSync('dist/robots.txt','utf8'):'User-agent: *\nAllow: /\n';
        writeFileSync('dist/robots.txt',robots.trimEnd()+'\nSitemap: '+site+'/sitemap.xml\n');
      }
    }]
  };
});

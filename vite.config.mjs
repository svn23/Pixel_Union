import {defineConfig, loadEnv} from 'vite';
import {instagramResponse} from './server/instagram.mjs';

export default defineConfig(({mode}) => {
  const env = {...loadEnv(mode, process.cwd(), ''), ...process.env};
  const attach = server => { server.middlewares.use('/api/instagram', async (req,res) => {
    if (req.method !== 'GET') {res.writeHead(405, {Allow:'GET'});res.end();return;}
    const response = await instagramResponse(env);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
  }); };
  return {plugins:[{name:'instagram-server-route',configureServer:attach,configurePreviewServer:attach}]};
});

// Server-only: never expose these credentials through VITE_ variables.
export async function instagramResponse(env, fetcher = fetch) {
  const json = (body, status = 200) => Response.json(body, {status, headers: {'Cache-Control': 'no-store'}});
  const {INSTAGRAM_ACCESS_TOKEN: token, INSTAGRAM_USER_ID: id, INSTAGRAM_API_VERSION: version} = env;
  if (!token || !/^\d+$/.test(id || '') || !/^v\d+\.\d+$/.test(version || '')) {
    return json({posts: [], status: 'not_connected'});
  }
  try {
    const url = new URL(`https://graph.instagram.com/${version}/${id}/media`);
    url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp');
    url.searchParams.set('limit', '3');
    const response = await fetcher(url, {headers: {Authorization: `Bearer ${token}`}, cache: 'no-store', signal: AbortSignal.timeout(8000)});
    if (!response.ok) return json({posts: [], status: 'unavailable'}, 503);
    const data = await response.json();
    if (!Array.isArray(data.data)) return json({posts: [], status: 'unavailable'}, 503);
    const posts = data.data.map(item => ({id:item.id, caption:typeof item.caption === 'string' ? item.caption : '', image:item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url, url:item.permalink, timestamp:item.timestamp}))
      .filter(post => {
        try {return post.id && new URL(post.image).protocol === 'https:' && /^https:\/\/(www\.)?instagram\.com\//.test(post.url) && Number.isFinite(Date.parse(post.timestamp));} catch {return false;}
      }).sort((a,b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)).slice(0,3);
    return json({posts, status:'connected'});
  } catch {return json({posts: [], status: 'unavailable'}, 503);}
}

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {instagramResponse} from './instagram.mjs';
const env={INSTAGRAM_ACCESS_TOKEN:'test-secret',INSTAGRAM_USER_ID:'123',INSTAGRAM_API_VERSION:'v25.0'};
test('unconnected account returns no placeholders and makes no external call', async()=>{
  const res=await instagramResponse({},()=>{throw Error('Must not fetch')});
  assert.deepEqual(await res.json(),{posts:[],status:'not_connected'});
  assert.equal(res.headers.get('cache-control'),'no-store');
});
test('requests fresh media each time; sorts, limits, handles video, strips secrets',async()=>{
  let calls=0;
  const mock=async(url, options)=>{
    calls++; assert.equal(url.searchParams.get('limit'),'3'); assert.equal(options.cache,'no-store');
    assert.equal(options.headers.Authorization,'Bearer test-secret');
    return Response.json({data:[1,4,2,3].map(i=>({id:String(i),media_type:i===4?'VIDEO':'IMAGE',media_url:'https://cdn.example/image.jpg',thumbnail_url:'https://cdn.example/thumb.jpg',permalink:`https://www.instagram.com/p/${i}/`,timestamp:`2026-09-0${i}T12:00:00Z`,access_token:'test-secret'}))});
  };
  await instagramResponse(env,mock); const res=await instagramResponse(env,mock);const data=await res.json();
  assert.equal(calls,2);assert.deepEqual(data.posts.map(p=>p.id),['4','3','2']);assert.equal(data.posts[0].image,'https://cdn.example/thumb.jpg');assert.ok(!JSON.stringify(data).includes('test-secret'));
});
test('upstream failures produce safe fallback with no credential disclosure',async()=>{
  for(const mock of [async()=>Response.json({error:'test-secret'},{status:401}),async()=>{throw Error('test-secret')}]){
    const res=await instagramResponse(env,mock); assert.equal(res.status,503);assert.deepEqual(await res.json(),{posts:[],status:'unavailable'});
  }
});

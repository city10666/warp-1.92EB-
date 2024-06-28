addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const keys = [
  "478YA0Rv-Vg69y2W7-UA1M479q",
  '6q857aNA-56h2Ilq0-GC1258li',
  'N97G08Jb-Fp0z5o71-D5g80Ee7',
  'hAS52u74-c39MY65w-3xWo056i',
  '279n4XKo-aY4If176-xt1Iw926',
];

const headers = {
  'CF-Client-Version': 'a-6.11-2223',
  'Host': 'api.cloudflareclient.com',
  'Connection': 'Keep-Alive',
  'Accept-Encoding': 'gzip',
  'User-Agent': 'okhttp/3.12.1'
};

async function handleRequest(request) {
  const key = await getKey();
  return new Response(key, {
    headers: { 'Content-Type': 'text/plain' },
  });
}

async function getKey() {
  const regUrl = 'https://api.cloudflareclient.com/v0a2223/reg';

  let response1 = await fetch(regUrl, {
    method: 'POST',
    headers: headers
  });
  let json1 = await response1.json();
  let id = json1.id;
  let license = json1.account.license;
  let token = json1.token;

  let response2 = await fetch(regUrl, {
    method: 'POST',
    headers: headers
  });
  let json2 = await response2.json();
  let id2 = json2.id;
  let token2 = json2.token;

  let headersGet = { ...headers, 'Authorization': `Bearer ${token}` };
  let headersGet2 = { ...headers, 'Authorization': `Bearer ${token2}` };
  let headersPost = { ...headers, 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}` };

  let patchJson = { 'referrer': `${id2}` };
  await fetch(`${regUrl}/${id}`, {
    method: 'PATCH',
    headers: headersPost,
    body: JSON.stringify(patchJson)
  });
  await fetch(`${regUrl}/${id2}`, {
    method: 'DELETE',
    headers: headersGet2
  });

  let key = keys[Math.floor(Math.random() * keys.length)];

  let putJson1 = { 'license': `${key}` };
  await fetch(`${regUrl}/${id}/account`, {
    method: 'PUT',
    headers: headersPost,
    body: JSON.stringify(putJson1)
  });

  let putJson2 = { 'license': `${license}` };
  await fetch(`${regUrl}/${id}/account`, {
    method: 'PUT',
    headers: headersPost,
    body: JSON.stringify(putJson2)
  });

  let response3 = await fetch(`${regUrl}/${id}/account`, {
    method: 'GET',
    headers: headersGet
  });
  let json3 = await response3.json();
  let updatedLicense = json3.license;

  await fetch(`${regUrl}/${id}`, {
    method: 'DELETE',
    headers: headersGet
  });

  return updatedLicense;
}
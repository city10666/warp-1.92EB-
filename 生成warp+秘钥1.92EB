import requests
import random
import json

# Change keys if needed
keys = [
        "478YA0Rv-Vg69y2W7-UA1M479q",
        '6q857aNA-56h2Ilq0-GC1258li',
        'N97G08Jb-Fp0z5o71-D5g80Ee7',
        'hAS52u74-c39MY65w-3xWo056i',
        '279n4XKo-aY4If176-xt1Iw926',
]

headers = {
    'CF-Client-Version': 'a-6.11-2223',
    'Host': 'api.cloudflareclient.com',
    'Connection': 'Keep-Alive',
    'Accept-Encoding': 'gzip',
    'User-Agent': 'okhttp/3.12.1'
}

def get_key():
    r1 = requests.post('https://api.cloudflareclient.com/v0a2223/reg', headers=headers)
    json1 = r1.json()
    id = json1['id']
    license = json1['account']['license']
    token = json1['token']

    r2 = requests.post('https://api.cloudflareclient.com/v0a2223/reg', headers=headers)
    json2 = r2.json()
    id2 = json2['id']
    token2 = json2['token']

    headers_get = {**headers, 'Authorization': f'Bearer {token}'}
    headers_get2 = {**headers, 'Authorization': f'Bearer {token2}'}
    headers_post = {**headers, 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': f'Bearer {token}'}

    patch_json = {'referrer': f'{id2}'}
    requests.patch(f'https://api.cloudflareclient.com/v0a2223/reg/{id}', headers=headers_post, data=json.dumps(patch_json))
    requests.delete(f'https://api.cloudflareclient.com/v0a2223/reg/{id2}', headers=headers_get2)

    key = random.choice(keys)

    put_json1 = {'license': f'{key}'}
    requests.put(f'https://api.cloudflareclient.com/v0a2223/reg/{id}/account', headers=headers_post, data=json.dumps(put_json1))

    put_json2 = {'license': f'{license}'}
    requests.put(f'https://api.cloudflareclient.com/v0a2223/reg/{id}/account', headers=headers_post, data=json.dumps(put_json2))

    r3 = requests.get(f'https://api.cloudflareclient.com/v0a2223/reg/{id}/account', headers=headers_get)
    json3 = r3.json()
    updated_license = json3['license']

    requests.delete(f'https://api.cloudflareclient.com/v0a2223/reg/{id}', headers=headers_get)

    return updated_license

if __name__ == "__main__":
    key = get_key()
    print(key)

/*
 * Copyright (c) molikai-work (2024)
 * molikai-work 的特定修改和新增部分
 * 根据 MIT 许可证发布
 */

interface ImageItem {
	url: string;
}

export interface BingWallpaperJson {
	images: ImageItem[];
}

export function encodeData(data: object) {
	const array: string[] = [];
	for (const key in data) {
		const value = data[key as keyof typeof data];
		if (value) {
			array.push(key + "=" + encodeURIComponent(value));
		}
	}
	return array.join("&");
}

// https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US
export async function getBingWallpaperJson(idx: number): Promise<BingWallpaperJson> {
    const response = await fetch("https://www.bing.com/HPImageArchive.aspx?" + encodeData({
        format: "js",
        idx: idx.toString() || "0",
        n: "1",
        mkt: "zh-CN"
    }), {
        headers: {
            'Accept-Language': 'zh-CN'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch Bing wallpaper JSON');
    }

    return response.json();
}

export async function getBingWallpaperUrl(
    idx: number,
    urlModifier?: (url: string) => string
) {
	try {
		const json = await getBingWallpaperJson(idx);

		let url = "https://www.bing.com" + json.images[0].url;
		if (urlModifier) {
			url = urlModifier(url);
		}

		const cacheKey = new Request(url, { method: 'GET' });
		const cache = caches.default;

		let response = await cache.match(cacheKey);
		if (!response) {
			const imageResponse = await fetch(url);
			if (!imageResponse.ok) {
				throw new Error('Failed to fetch image');
			}

			const imageData = await imageResponse.arrayBuffer();
			const headers = new Headers();
			headers.set("Content-Type", imageResponse.headers.get("Content-Type") || "image/jpeg");
			headers.set("Cache-Control", "max-age=3600");

			response = new Response(imageData, {
				status: 200,
				headers: headers
			});

			await cache.put(cacheKey, response.clone());
		}

		return response;
	} catch {
		return new Response(null, {
			status: 500
		});
	}
}

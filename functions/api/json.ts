/*
 * Copyright (c) molikai-work (2024)
 * molikai-work 的特定修改和新增部分
 * 根据 MIT 许可证发布
 */

import { getBingWallpaperJson } from "./utils";

export const onRequest: PagesFunction = async (context) => {
	const url = new URL(context.request.url);
    let idx = parseInt(url.searchParams.get("before") || "0", 10);

    if (isNaN(idx)) {
        idx = 0;
    }

	try {
		const json = await getBingWallpaperJson(idx);

		const headers = new Headers();
		headers.set("Access-Control-Allow-Origin", "*");
		headers.set("Cache-Control", "max-age=3600");
		headers.set("Content-Type", "application/json; charset=utf-8");
		headers.set("Vary", "Accept-Language");

		return new Response(JSON.stringify(json), {
			headers: headers
		});
	} catch {
		const headers = new Headers();
		headers.set("Access-Control-Allow-Origin", "*");

		return new Response(null, {
			headers: headers,
			status: 500
		});
	}
};

/*
 * Copyright (c) molikai-work (2024)
 * molikai-work 的特定修改和新增部分
 * 根据 MIT 许可证发布
 */

import { getBingWallpaperUrl } from "./utils";

export const onRequest: PagesFunction = async (context) => {
	const url = new URL(context.request.url);
    let idx = parseInt(url.searchParams.get("before") || "0", 10);

    if (isNaN(idx)) {
        idx = 0;
    }

	const response = await getBingWallpaperUrl(idx);

    const corsHeaders = new Headers(response.headers);
    corsHeaders.set("Access-Control-Allow-Origin", "*");
    corsHeaders.set("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS");
    corsHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    corsHeaders.set("Access-Control-Max-Age", "86400");

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: corsHeaders,
    });
};

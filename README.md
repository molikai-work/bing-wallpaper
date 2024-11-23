# Bing-Wallpaper.Pages.Dev
This service provides daily Bing wallpapers via a serverless implementation using Cloudflare Pages.

Forked from shangzhenyang/bing-wallpaper and modified.

## Disclaimer
This website serves as an intermediary platform to facilitate quick access to Bing wallpapers. It does not store any Bing wallpapers; instead, all wallpapers are obtained from Bing and transferred to the client via proxy. This is particularly useful in regions where accessing Bing might be restricted. All wallpapers are the property of their respective owners.

Users assume all copyright risks associated with using this service. This website does not take responsibility for any copyright disputes, legal liabilities, or other losses that may arise from the use of this service.

## Endpoints
### `GET /api/720p`
Returns the latest Bing wallpaper of the day in 720p resolution as a JPG image.

### `GET /api/1080p`
Returns the latest Bing wallpaper of the day in 1080p resolution as a JPG image.

### `GET /api/4k`
Returns the latest Bing wallpaper of the day in 4K resolution as a JPG image.

### `GET /api/json`
Returns a JSON object containing wallpaper information.

## Parameters
### `GET /api/xxx?before=1`
This endpoint, with parameters, returns the Bing wallpaper from the previous day in the specified resolution (xxx) as a JPG image. The default is set to the latest wallpaper of the day.

## License
[MIT license](LICENSE)

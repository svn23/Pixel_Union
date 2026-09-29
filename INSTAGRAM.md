# Instagram feed connection

No posts are hardcoded. The hero uses the company logo. A small optional feed requests `/api/instagram` once on each full page load using `cache: no-store`. The server requests up to three recent media items from Meta without an application cache. Instagram's own availability and rate limits still apply.

Until authorized, or if Meta is unavailable, visitors see only a profile link and a short invitation to follow. No stale or sample posts are substituted.

To connect: configure a Meta app for Instagram API with Instagram Login, authorize the Pixel Union Business/Creator account with the `instagram_business_basic` permission, then put the account ID, access token, and the app's supported API version in server-only `.env.local` settings. Restart the server. Never paste tokens into source or use `VITE_` variables. Token renewal/reconnection must be maintained according to Meta's token lifecycle.

`vite.config.mjs` serves the endpoint during local development and preview. For public deployment, mount `instagramResponse(env)` from `server/instagram.mjs` at GET `/api/instagram` in the hosting provider's server/worker, using its secret storage. A static-only upload will not run this endpoint.

Live account fetching has not been verified: account authorization has not been supplied. Mock tests cover fresh requests, a three-item limit, video thumbnails, and failure handling.

Reference: https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api

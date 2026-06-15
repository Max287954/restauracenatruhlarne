export async function onRequest(context) {
  try {
    const client_id = context.env.OAUTH_GITHUB_CLIENT_ID;
    const client_secret = context.env.OAUTH_GITHUB_CLIENT_SECRET;

    if (!client_id || !client_secret) {
      return new Response("Error: Missing OAUTH_GITHUB_CLIENT_ID or OAUTH_GITHUB_CLIENT_SECRET in environment variables.", { status: 500 });
    }

    const url = new URL(context.request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response("Error: No authorization code returned from GitHub.", { status: 400 });
    }

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Cloudflare-Pages-CMS-Auth'
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    });

    const data = await response.json();

    if (data.error) {
      return new Response(`GitHub API Error: ${data.error} - ${data.error_description}`, { status: 500 });
    }

    const token = data.access_token;
    const provider = 'github';

    const script = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:${provider}", "*");
      </script>
    `;

    return new Response(script, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    return new Response(`Server Error in callback.js: ${err.message}`, { status: 500 });
  }
}
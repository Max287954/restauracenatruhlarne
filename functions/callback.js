export async function onRequest(context) {
  try {
    const client_id = (context.env.OAUTH_GITHUB_CLIENT_ID || "").trim();
    const client_secret = (context.env.OAUTH_GITHUB_CLIENT_SECRET || "").trim();

    if (!client_id || !client_secret) {
      return new Response("Error: Missing env vars.", { status: 500 });
    }

    const url = new URL(context.request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return new Response("Error: No code.", { status: 400 });
    }

    const params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("client_secret", client_secret);
    params.append("code", code);

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: params,
    });

    const data = await response.json();

    if (data.error) {
      return new Response(`GitHub API Error: ${data.error} - ${data.error_description}`, {
        status: 500,
      });
    }

    const token = data.access_token;
    const provider = "github";

    const script = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
          window.close();
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:${provider}", "*");
      </script>
    `;

    return new Response(script, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (err) {
    return new Response(`Server Error: ${err.message}`, { status: 500 });
  }
}

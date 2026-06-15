export async function onRequest(context) {
  const client_id = (context.env.OAUTH_GITHUB_CLIENT_ID || "").trim();
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.append("client_id", client_id);
  url.searchParams.append("scope", "repo,user");
  return Response.redirect(url.toString(), 302);
}

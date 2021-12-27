import { NextApiRequest, NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, _res: NextApiResponse) => {
  try {
    if (_req.method == "POST") {
      const { code } = JSON.parse(_req.body);

      const req = new URLSearchParams();
      req.append("client_id", process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID);
      req.append(
        "client_secret",
        process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET
      );
      req.append("grant_type", "authorization_code");
      req.append("code", code);
      req.append(
        "redirect_uri",
        process.env.NEXT_PUBLIC_DISCORD_CLIENT_REDIRECT
      );

      const res = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: req,
      });
      const data = await res.json();

      const ajaxRes = await fetch(
        `http://discordapp.com/api/oauth2/@me?access_token=${data.access_token}`,
        {
          headers: {
            Authorization: `${data.token_type} ${data.access_token}`,
          },
        }
      );
      const { user } = await ajaxRes.json();
      _res.json(user);
    }
  } catch (err) {
    _res.status(400).json({ err: err.message });
  }
};
export default handler;

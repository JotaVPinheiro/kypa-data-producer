import "dotenv/config";

const { AUTH_KEY } = process.env;

export function middleware(req, res, next) {
  const requestAuthKey = req.headers["x-auth-key"];

  if (requestAuthKey !== AUTH_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}

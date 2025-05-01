import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // res.cookie("jwt", token, {
  //   maxAge: 7 * 24 * 60 * 60 * 1000, // this is 7 days in milliseconds
  //   httpOnly: true, // this is to prevent the cookie from being accessed by the client/attackers
  //   sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  //   // this is to prevent the cookie from being sent to other domains
  //   secure: process.env.NODE_ENV === "production", // Enforce in production only
  //   // cookie to be sent only over https
  // });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  return token;
};

import { request, response } from "express";

export const isLogged = async (req = request, res = response, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ status: "Error", msg: " Log in to continue " });
  }
};

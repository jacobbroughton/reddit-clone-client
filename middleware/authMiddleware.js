export function isAuth (req, res, next) {
  console.log("req.session", req.session)
  console.log("req.user", req.user)
  console.log("req.body", req.body)
  if (req.user) {
    next(); // moves on
  } else {
    res
      .status(401)
      .json({
        message: "You are not authorized",
        user: req.user,
        session: req.session,
      });
  }
}

export function isAdmin (req, res, next) {
  if (req.isAuthenticated() && req.user.ADMIN) {
    next(); // moves on
  } else {
    res.status(401).json({ message: "You are not an admin" });
  }
}

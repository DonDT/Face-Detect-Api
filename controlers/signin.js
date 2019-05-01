const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Unable to sign in");
  }
  db.select("email", "has")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].has);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("unabale to get user"));
      } else {
        err => res.status(400).json("So wrong redentials");
      }
    })
    .catch(err => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignin: handleSignin
};

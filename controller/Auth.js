const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then((user) => {
      res.json({ status: "success", user });
    })
    .catch((err) => {
      res.json({ status: "error", message: err.message });
    });
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // TODO : this is temporary, we will use encryption to compare the passwords
    console.log({ user });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    } else if (user.password === req.body.password) {
      res
        .status(200)
        .json({
          message: "Login Successful",
          id: user.id,
          name: user.name,
          email: user.email,
          addresses: user.addresses,
        });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

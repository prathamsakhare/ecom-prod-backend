const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // * here we are using the select method to select the fields we want to return, its called projection, those fields which we want to select we will write them in the select method, for ex. 'name', 'email'
    const user = await User.findById(id, "name, email, id");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.json({ status: "success", user });
    })
    .catch((err) => {
      res.json({ status: "error", message: err.message });
    });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    // * new : true will return the updated document to the frontend instead of the old document
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(400).json({ msg: "Invalid user data" });
    }
    const savedData = await userData.save();
    res.status(201).json({ msg: "User created successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

export const getData = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json({ msg: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "User fetched successfully", data: user });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ msg: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
};

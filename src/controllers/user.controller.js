import { UserModel } from '../models/user.model.js';

export const listUsers = async (_req, res, next) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await UserModel.create(req.validated.body);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
};

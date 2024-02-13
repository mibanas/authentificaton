import { Request, Response } from 'express';
import userModel from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
    completeName: string;
    email: string;
    password: string;
    role: String;
  }

interface LoginRequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: User | null = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email already exist or password is wrong!',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const secret = process.env.SECRET_KEY as string;
      const payload = {
        name: user.completeName,
        email: user.email,
      };
      const options = {
        expiresIn: '1h',
        algorithm: 'HS256',
      };

      const tokenGenereted = jwt.sign(payload, secret, options);
      const updatedUser = await userModel.findOneAndUpdate(
        { email: user.email },
        { $set: { token: tokenGenereted } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: 'User is authenticated',
        user: updatedUser?.completeName,
        token: tokenGenereted,
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Email already exist or password is wrong!',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const checkEmail: User | null = await userModel.findOne({
      email: email,
    });
    if (checkEmail) {
      return res.status(400).json({
        sucess: true,
        message: 'User already exists',
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    const addUser = await userModel.create({
      username: username,
      email: email,
      password: cryptedPassword,
    });
    return res.status(201).json({
      sucess: true,
      message: 'User created successfully',
      data: addUser,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: 'Something went wrong',
    });
  }
};

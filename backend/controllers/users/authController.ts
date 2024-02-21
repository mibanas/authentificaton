import { Request, Response } from 'express';
import userModel from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';

// interface User {
//     completeName: string;
//     email: string;
//     password: string;
//     role: String;
//   }

// interface LoginRequestBody {
//   email: string;
//   password: string;
// }

// interface RegisterRequestBody {
//   username: string;
//   email: string;
//   password: string;
// }

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await userModel.findOne({ email: email })
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email Not exist or wrong password",
        })
    }
    

    const passwordMatch = await bcrypt.compare(password, user.password as string)
    if (passwordMatch) {
        
        const secret: any = process.env.SECRET_KEY
        const payload = {
            name: user.completeName,
            email: user.email,
        }
        const options: SignOptions = {
            expiresIn: '1h',
            algorithm: 'HS256',
        }
        
        const token = jwt.sign(payload, secret, options)

    return res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: user.completeName,
        token,
    })
  }

  res.status(400).json({
    success: false,
    message: "Email already exist or password is wrong!",
  })
} catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
  })
}
};



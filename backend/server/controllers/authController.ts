import { Request, Response } from 'express';


export const registerUser = (req: Request, res: Response) => {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        return res.status(400).json({message: 'All fields are required'});
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
    return res.json({ message: `User ${username} registered successfully!` });

}
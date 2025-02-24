import { Request, Response } from 'express';
import { db } from '../../../config/database';
import { users } from '../../../db/schema';
import * as bcrypt from 'bcrypt';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const newUser = { email, password: hashedPassword };
    await db.insert(users).values(newUser).run();

    res.send({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

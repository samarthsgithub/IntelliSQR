import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = userSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = userSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: validatedData.email } });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(validatedData.password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id },  "iamsamarth", { expiresIn: "1h" });

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

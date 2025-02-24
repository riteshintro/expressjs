import { Request, Response } from 'express';
import { db } from '../../../db/index';
import { boards } from '../../../db/admin.schema'
import { eq } from 'drizzle-orm';

export const createBoard = async (req: Request, res: Response): Promise<Response>=> {
  try {
    const { name, status } = req.body;

    if (!name || !status) {
      return res.status(400).json({ error: "Name and status are required" });
    }

    // Optional: Ensure status is valid
    const validStatuses = ["active", "inactive"]; // Adjust as needed
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Optional: Check for duplicate names
    const existingBoard = await db.select().from(boards).where(eq(boards.name, name)).limit(1);
    if (existingBoard.length > 0) {
      return res.status(409).json({ error: "Board name already exists" });
    }
    if (existingBoard) {
      return res.status(409).json({ error: "Board name already exists" });
    }

    const [result] = await db.insert(boards).values({ name, status }).returning({ id: boards.id, name: boards.name, status: boards.status });

    
    return res.status(201).json(result);
  } catch (error: any) {
    console.error("Error creating board:", error);

    return res.status(500).json({
      error: "Failed to create board",
      details: error.message || "Unknown error",
    });
  }
};

export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(boards);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch name boards' });
  }
};

// export const getNameById = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     if (!id) {
//       return res.status(400).json({ error: 'ID is required' });
//     }

//     const result = await db.select().from(boards).where(eq(boards.id, Number(id)));
//     if (result.length === 0) {
//       return res.status(404).json({ error: 'Name board not found' });
//     }
//     res.json(result[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch name board' });
//   }
// };

// export const updateBoard = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     if (!id) {
//       return res.status(400).json({ error: 'ID is required' });
//     }

//     const { name, status } = req.body;
//     if (!name && !status) {
//       return res.status(400).json({ error: 'At least one field is required to update' });
//     }

//     const result = await db.update(boards).set({ name, status }).where(eq(boards.id, Number(id)));
//     if (result === 0) {
//       return res.status(404).json({ error: 'Name board not found' });
//     }
//     res.json({ message: 'Name board updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update name board' });
//   }
// };

// export const deleteBoard = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     if (!id) {
//       return res.status(400).json({ error: 'ID is required' });
//     }

//     const result = await db.delete(boards).where(eq(boards.id, Number(id)));
//     if (result === 0) {
//       return res.status(404).json({ error: 'Name board not found' });
//     }
//     res.json({ message: 'Name board deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to delete name board' });
//   }
// };

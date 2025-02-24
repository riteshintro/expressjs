import { Request, Response } from 'express';
import { db } from '../../../db/index';
import { boards } from '../../../db/admin.schema'

export const createMedium = async (req: Request, res: Response) => {
  try {
    const { name, status } = req.body;
    if (!name || !status) {
      return res.status(400).json({ error: 'Name and status are required' });
    }

    const result = await db.insert(boards).values({ name, status });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create name board' });
  }
};

export const getAllMedium = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(boards);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch name boards' });
  }
};

export const getMediumById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const result = await db.select().from(boards).where(eq(boards.id, Number(id)));
    if (result.length === 0) {
      return res.status(404).json({ error: 'Name board not found' });
    }
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch name board' });
  }
};

export const updateMedium = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const { name, status } = req.body;
    if (!name && !status) {
      return res.status(400).json({ error: 'At least one field is required to update' });
    }

    const result = await db.update(boards).set({ name, status }).where(eq(boards.id, Number(id)));
    if (result === 0) {
      return res.status(404).json({ error: 'Name board not found' });
    }
    res.json({ message: 'Name board updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update name board' });
  }
};

export const deleteMedium= async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const result = await db.delete(boards).where(eq(boards.id, Number(id)));
    if (result === 0) {
      return res.status(404).json({ error: 'Name board not found' });
    }
    res.json({ message: 'Name board deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete name board' });
  }
};

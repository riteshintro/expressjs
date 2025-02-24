import { Router } from 'express';
// import { getUsers, createUser } from '../controllers/admin/users';
import { createBoard, getAllBoards } from '../controllers/admin/board';
import { Request, Response } from 'express';
import { createMedium, deleteMedium, getAllMedium, getMediumById, updateMedium } from '../controllers/admin/medium';

const router = Router();

// router.get('/login', getUsers);

//?board
router.post('/board/create', createBoard as (req: Request, res: Response) => void);
router.get('/board/board-list', getAllBoards);
// router.post('/board/getboardbyid:id', getNameById);
// router.post('/board/update-board:id', updateBoard);
// router.post('/board/delete-board:id', deleteBoard);

//?medium
// router.post('/medium/create', createMedium);
// router.post('/medium/medium-list', getAllMedium);
// router.post('/medium/get-medium-by-id:id', getMediumById);
// router.post('/medium/update-medium', updateMedium);
// router.post('/medium/delete-medium', deleteMedium);



export default router;
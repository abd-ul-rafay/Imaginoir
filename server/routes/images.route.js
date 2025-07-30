import express from 'express';
import { getPublicImages, getUserImages, generateImage, updateImage, deleteImage } from '../controllers/images.controller.js';

const router = express.Router();
router.use(express.json()); 

router.get('/', getPublicImages);
router.post('/', generateImage);
router.get('/mine', getUserImages);
router.patch('/:id', updateImage);
router.delete('/:id', deleteImage);

export default router;

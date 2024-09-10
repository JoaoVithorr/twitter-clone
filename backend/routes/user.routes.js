import express from 'express';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/profile/:username', getUserProfile);
router.get('/profile/suggested', getUserProfile);
router.post('/profile/follow/:id', followUnfollowUser);
router.post('/update', protectRoute, updateUserProfile);

export default router;
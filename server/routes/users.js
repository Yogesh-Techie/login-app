import express, { Router } from 'express';
import { signin, signup } from '../controllers/user.js';

import {  } from '../controllers/posts.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
import express from 'express';
import profileController from '../controllers/profile-controller.js';
import multer from 'multer';
import path from 'path';





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
 });

const router = express.Router();

router.get('/profile', profileController.profileUser);
router.post('/posts', upload.single('file'), profileController.userPosts);
router.get('/posts', profileController.getUserPosts );
router.get('/posts/:id',profileController.getPagePosts)
router.put('/posts/:id', upload.single('file'), profileController.updatePost);


export default router;

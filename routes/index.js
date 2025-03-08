const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { UserController } = require('../controllers');

const uploadDestination = path.join(__dirname, '../uploads');

// Проверяем, существует ли папка для загрузок, если нет — создаем её
if (!fs.existsSync(uploadDestination)) {
  fs.mkdirSync(uploadDestination, { recursive: true });
}

// Настройка хранилища для загрузки файлов
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Маршруты
router.post('/register', upload.single('avatar'), UserController.register);
router.post('/login', UserController.login);
router.get('/current', UserController.current);
router.get('/user/:id', UserController.getUserById);
router.put('/user/:id', UserController.updateUser);

module.exports = router;

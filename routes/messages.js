// routes/messages.js
import express from 'express';
import {
  deleteMessageByID,
  getMessageByID,
  addMessage,
  messages,
} from '../controllers/messageController.js';
const router = express.Router();

// GET Home
router.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'Salma Mini Messageboard',
    messages,
  });
});
router.get('/messages/:id', getMessageByID);
// GET New Message Form
router.get('/new', (req, res) => {
  res.render('pages/component/form', {
    title: 'New Message',
  });
});

router.post('/messages/:id/delete', deleteMessageByID);

router.post('/new', (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).send('Both name and message are required.');
  }

  addMessage({ text, user });
  res.redirect('/');
});
export default router;

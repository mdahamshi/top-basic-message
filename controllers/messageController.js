import { getRandomColor } from '../public/randomColor.js';

let id = 0;
export const getNewID = () => {
  return id++;
};
export const messages = [
  {
    text: 'Hi there!',
    user: 'Mohammad',
    added: new Date(),
    color: getRandomColor(),
    id: getNewID(),
    protected: true,
  },
  {
    text: 'I love Dad :)',
    user: 'Sarah',
    added: new Date(),
    color: getRandomColor(),
    id: getNewID(),
    protected: true,
  },
  {
    text: 'I also love Dad :)',
    user: 'Salmah',
    added: new Date(),
    color: getRandomColor(),
    id: getNewID(),
    protected: true,
  },
];

export const addMessage = (msg) =>
  messages.push({
    ...msg,
    id: getNewID(),
    added: new Date(),
    color: getRandomColor(),
  });

export const getMessageByID = async (req, res) => {
  const { id } = req.params;
  console.log(typeof id);
  try {
    const msg = messages.find((msg) => msg.id === parseInt(id));

    if (!msg) {
      throw new Error('Message not found');
    }

    res.render('pages/message', {
      title: 'Message Details',
      msg,
    });
  } catch (error) {
    console.error(`Error retrieving message: ${id}`, error);
    res.status(500).render('404', {
      title: '404',
      errorMessage: error || 'Internal Server Error',
    });
  }
};

export const deleteMessageByID = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(typeof id);
  try {
    const index = messages.findIndex((msg) => msg.id === id);
    if (index === -1) {
      return res.status(404).render('404');
    }
    if (messages[index].protected) {
      return res
        .status(403)
        .send('This message is protected and cannot be deleted.');
    }
    messages.splice(index, 1);

    res.redirect('/');
  } catch (error) {
    console.error(`Error retrieving message: ${id}`, error);
    res.status(500).render('404', {
      title: '404',
      errorMessage: error || 'Internal Server Error',
    });
  }
};

import nextConnect from 'next-connect';

import dbConnect from '../../../lib/dbConnect';
import { signin, signup } from '../../../controllers/userController';


const handler = nextConnect();

dbConnect();

handler.post(async (req, res) => {
    try {
      const { action } = req.body;
      if (action === 'signup') {
        await signup(req, res);
      } else if (action === 'signin') {
        await signin(req, res);
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

export default handler;

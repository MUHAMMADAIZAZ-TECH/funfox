import nextConnect from 'next-connect';

import dbConnect from '../../../lib/dbConnect';
import { createTask, readTasks } from '../../../controllers/taskControllers';
import { authenticate } from '@/middlewares/jwt.middleware';


const handler = nextConnect();

dbConnect();
handler
    // .use(authenticate)
    .post(createTask)
    .get(readTasks);


export default handler;

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import mysql from 'mysql2';

import { CreatePostController } from './controllers/create-post.controller';
import { PostRepo } from '../data/mysql/post.repo';
import { MemberRepo } from '../data/mysql/member.repo';
import { CreatePostService } from '../../application/services/create-post.service';
import { DeletePostService } from '../../application/services/delete-post.service';
import { DeletePostController } from './controllers/delete-post.controller';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

const database = mysql.createConnection({
  host: 'localhost',
  user: 'serhii',
  password: '123',
  database: 'forum',
});

app.post(
  '/post',
  new CreatePostController(
    new CreatePostService(new PostRepo(database), new MemberRepo(database)),
  ).createPost,
);

app.delete(
  '/post',
  new DeletePostController(new DeletePostService(new PostRepo(database)))
    .deletePost,
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const { name, email, picture } = ticket.getPayload();

  res.status(201);
  res.json({ name, email, picture });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is ready at http://localhost:${process.env.PORT || 5000}`);
});

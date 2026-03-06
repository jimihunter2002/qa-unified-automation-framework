import bodyParser from 'body-parser';
import express from 'express';
import { validateGuardian } from './guardianEngine.js';

const app = express();
app.use(bodyParser.json());

app.post('/guardian/validate', (req, res) => {
  try {
    const result = validateGuardian(req.body);

    const status = result.approved ? 200 : 400;
    res.status(status).json(result);
  } catch {
    // If validateGuardian crashes, this prevents a generic 500
    res
      .status(400)
      .json({ approved: false, violations: ['Invalid Server error'] });
  }
});

app.get('/health', (_req, res) => res.status(200).send('OK'));

app.listen(3001, '0.0.0.0', () => {
  console.log('Guardian service is running on port 3001');
});

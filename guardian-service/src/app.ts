import bodyParser from 'body-parser';
import express from 'express';
import { validateGuardian } from './guardianEngine.js';

const app = express();
app.use(bodyParser.json());

// app.post('/guardian/validate', (req, res) => {
//   res.json(validateGuardian(req.body));
// });

app.post('/guardian/validate', (req, res) => {
  try {
    const result = validateGuardian(req.body);

    // Check if your engine returned an error/failure
    if (!result || result.approved === false) {
      return res.status(400).json(result);
    }

    res.status(200).json(result);
  } catch {
    // If validateGuardian crashes, this prevents a generic 500
    res.status(400).json({ error: 'Invalid request format' });
  }
});

app.get('/health', (_req, res) => res.status(200).send('OK'));

app.listen(3001, '0.0.0.0', () => {
  console.log('Guardian service is running on port 3001');
});

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

export interface InquirySubmission {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  productInterest: string;
  projectRequirements: string;
  submittedAt: string;
}

const inquiries: InquirySubmission[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  app.post('/api/inquiries', (req, res) => {
    const {
      name,
      companyName,
      email,
      phone,
      productInterest,
      projectRequirements,
      websiteUrlHoneypot,
    } = req.body || {};

    // Anti-spam honeypot check
    if (websiteUrlHoneypot && String(websiteUrlHoneypot).trim().length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Automated submission detected.',
      });
    }

    if (!name || String(name).trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid contact name (at least 2 characters).',
      });
    }

    if (!companyName || String(companyName).trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your company or organization name.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid business email address.',
      });
    }

    const phoneClean = String(phone || '').replace(/[^\d+()-.\s]/g, '').trim();
    if (!phoneClean || phoneClean.length < 7) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid contact phone number.',
      });
    }

    if (!productInterest || String(productInterest).trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please select a primary product or reinforcement system of interest.',
      });
    }

    if (!projectRequirements || String(projectRequirements).trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please describe your project requirements (bar diameters, estimated quantity, or site location).',
      });
    }

    const record: InquirySubmission = {
      id: `INQ-${Date.now().toString().slice(-6)}`,
      name: String(name).trim(),
      companyName: String(companyName).trim(),
      email: String(email).trim(),
      phone: phoneClean,
      productInterest: String(productInterest).trim(),
      projectRequirements: String(projectRequirements).trim(),
      submittedAt: new Date().toISOString(),
    };

    inquiries.unshift(record);

    return res.status(201).json({
      success: true,
      referenceId: record.id,
      submittedAt: record.submittedAt,
      message: 'Your engineering inquiry has been logged and assigned to our technical sales desk.',
    });
  });

  app.get('/api/inquiries', (_req, res) => {
    return res.json({
      count: inquiries.length,
      inquiries: inquiries.slice(0, 20),
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

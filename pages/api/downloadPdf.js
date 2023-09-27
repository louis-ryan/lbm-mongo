import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const pdfPath = path.join(process.cwd(), 'public', 'Tenant_transfer_application_form.pdf');
  const pdfBuffer = fs.readFileSync(pdfPath);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=tenant_transfer_application_form.pdf');

  res.end(pdfBuffer);
}

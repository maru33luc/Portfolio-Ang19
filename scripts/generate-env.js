const fs = require('fs');
const path = require('path');
require('dotenv').config();

const envDir = path.join(__dirname, '..', 'src', 'environments');

const content = (prod) => `// AUTO-GENERATED — do not edit manually
export const environment = {
  production: ${prod},
  emailjs: {
    serviceId: '${process.env['EMAILJS_SERVICE_ID'] || ''}',
    templateId: '${process.env['EMAILJS_TEMPLATE_ID'] || ''}',
    publicKey: '${process.env['EMAILJS_PUBLIC_KEY'] || ''}',
    toEmail: '${process.env['CONTACT_EMAIL'] || ''}',
  }
};
`;

fs.writeFileSync(path.join(envDir, 'environment.ts'), content(false));
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), content(true));

console.log('environment files generated');

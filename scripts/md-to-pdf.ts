import { mdToPdf } from 'md-to-pdf';
import path from 'path';

const filesToConvert = [
  {
    input: 'app/data/cv-ptbr.md',
    output: 'public/Curriculo_Leonardo_Silvatti_Silva.pdf'
  },
  {
    input: 'app/data/cv.md',
    output: 'public/Resume_Leonardo_Silvatti_Silva.pdf'
  }
];

async function generatePDFs(): Promise<void> {
  try {
    for (const file of filesToConvert) {
      const mdPath = path.join(process.cwd(), file.input);
      const pdfPath = path.join(process.cwd(), file.output);

      console.log(`Gerando ${file.output}...`);

      await mdToPdf(
        { path: mdPath },
        {
          dest: pdfPath,
          pdf_options: {
            format: 'A4',
            margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
            printBackground: true
          },
          css: `
            body { font-family: 'Inter', sans-serif; color: #222; line-height: 1.5; }
            h1, h2, h3 { color: #111; margin-bottom: 0.5em; }
            a { color: #0066cc; text-decoration: none; }
            hr { border: none; border-top: 1px solid #eaeaea; margin: 20px 0; }
          `
        }
      );
      
      console.log(`✔ Concluído: ${file.output}`);
    }
  } catch (err) {
    console.error('Falha ao gerar os PDFs:', err);
    process.exit(1);
  }
}

generatePDFs();
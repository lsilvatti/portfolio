import { mdToPdf } from 'md-to-pdf';
import path from 'path';

const filesToConvert = [
  // 1. Versão Full Stack (Português)
  {
    input: 'app/data/cv-ptbr.md',
    output: 'public/CV_Leonardo_Silvatti_Full_Stack.pdf'
  },
  // 2. Versão Full Stack (Inglês)
  {
    input: 'app/data/cv.md',
    output: 'public/Resume_Leonardo_Silvatti_Full_Stack.pdf'
  },
  // 3. Versão Product Owner (Português)
  {
    input: 'app/data/cv-po-ptbr.md',
    output: 'public/CV_Leonardo_Silvatti_Product_Owner.pdf'
  },
  // 4. Versão Product Owner (Inglês)
  {
    input: 'app/data/cv-po.md',
    output: 'public/Resume_Leonardo_Silvatti_Product_Owner.pdf'
  },
  // 5. Versão Front End (Português)
  {
    input: 'app/data/cv-fe-br.md',
    output: 'public/CV_Leonardo_Silvatti_Front_End.pdf'
  },
  // 6. Versão Front End (Inglês)
  {
    input: 'app/data/cv-fe.md',
    output: 'public/Resume_Leonardo_Silvatti_Front_End.pdf'
  }
];

async function generatePDFs(): Promise<void> {
  try {
    // Uso: `npm run generate:pdf` gera todos os CVs da lista acima;
    // `npm run generate:pdf -- <entrada.md> <saida.pdf>` gera um arquivo avulso.
    const [inputArg, outputArg] = process.argv.slice(2);
    const files = inputArg && outputArg
      ? [{ input: inputArg, output: outputArg }]
      : filesToConvert;

    for (const file of files) {
      const mdPath = path.resolve(process.cwd(), file.input);
      const pdfPath = path.resolve(process.cwd(), file.output);

      console.log(`Gerando ${file.output}...`);

      await mdToPdf(
        { path: mdPath },
        {
          dest: pdfPath,
          pdf_options: {
            format: 'A4',
            margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
            printBackground: true
          },
          css: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              color: #1f2937; 
              line-height: 1.45; 
              font-size: 13px;
            }

            h1 {
              font-size: 22px;
              font-weight: 700;
              color: #111827;
              margin-bottom: 4px;
              text-transform: none;
            }

            h2 {
              font-size: 14px;
              font-weight: 600;
              color: #374151;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 3px;
              margin-top: 16px;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            h3 {
              font-size: 13px;
              font-weight: 600;
              color: #1f2937;
              margin-top: 10px;
              margin-bottom: 2px;
            }

            p {
              margin: 0 0 6px 0;
            }

            ul {
              margin: 4px 0 10px 0;
              padding-left: 16px;
            }

            li {
              margin-bottom: 3px;
              color: #374151;
            }

            a { 
              color: #2563eb; 
              text-decoration: none; 
            }

            h2, h3, ul {
              page-break-inside: avoid;
            }
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

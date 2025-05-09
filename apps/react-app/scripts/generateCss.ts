import { generateCssVariables, palette, sizes, space } from '@common/styles';
import fs from 'fs';
import path from 'path';

// :root 안에 모든 CSS 변수 포함
const cssVariables = `
  :root {
    ${generateCssVariables(palette)}
    ${generateCssVariables(sizes)}
    ${generateCssVariables(space)}
  }
`;

// CSS 파일 생성 경로
const outputPath = path.join(process.cwd(), 'src/styles', 'variables.css');

fs.writeFileSync(outputPath, cssVariables, 'utf8');
console.log(`CSS variables generated at: ${outputPath}`);

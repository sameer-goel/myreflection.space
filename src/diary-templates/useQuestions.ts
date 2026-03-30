import raw from './questions.md?raw';

// Strip HTML comments (archived sections) before parsing
const stripped = raw.replace(/<!--[\s\S]*?-->/g, '');

const prompts: string[] = stripped
  .split('\n')
  .filter(line => line.trim().startsWith('- '))
  .map(line => line.trim().slice(2).trim());

export default prompts;

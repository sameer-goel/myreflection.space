import raw from './questions.md?raw';

const prompts: string[] = raw
  .split('\n')
  .filter(line => line.trim().startsWith('- '))
  .map(line => line.trim().slice(2).trim());

export default prompts;

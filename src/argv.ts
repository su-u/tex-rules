import argv from 'argv';

export const execArgv = () => {
  const options = {
    name: 'tex',
    short: 't',
    type: 'path',
    description: 'texファイルへのパス',
  };

  argv.version('v0.9.2');
  const args = argv.option(options).run();
  if (args.targets.length === 0 && Object.keys(args.options).length === 0) {
    console.log('引数がありません.');
    process.exit(1);
  }
  return {
    tex: args.options.tex ?? args.targets[0],
  };
};

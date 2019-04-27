// Global catch on promise rejection.
export const globalCatchOnPromiseRejection = () => process.on('unhandledRejection', (r) => {
  if (r instanceof Error) {
    console.error(`UncaughtRejection: ${r.message}\n${r.stack}`);
  }
  else {
    console.error(`UncaughtRejection: ${r}`);
  }
  process.exit(1);
});

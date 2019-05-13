export const base64Decode = (str: string): string => str && Buffer.from(str, 'base64').toString('ascii');

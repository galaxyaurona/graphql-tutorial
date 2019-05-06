export const base64Decode = (str: string): string => Buffer.from(str, 'base64').toString('ascii');

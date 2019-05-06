export const base64Encode = (str: string): string => Buffer.from(str, 'binary').toString('base64');

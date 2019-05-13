export const base64Encode = (str: string): string => str && Buffer.from(str, 'binary').toString('base64');

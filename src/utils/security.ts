import crypto from 'crypto';

export const hashIP = (ip: string): string => {
  return crypto
    .createHash('sha256')
    .update(ip + process.env.VITE_IP_SALT)
    .digest('hex');
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const getRateLimitKey = (ipHash: string): string => {
  return `rateLimit/${ipHash}`;
};
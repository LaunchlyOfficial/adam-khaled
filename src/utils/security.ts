import crypto from 'crypto';

// Browser-compatible hashing function
const hashString = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const hashIP = async (ip: string): Promise<string> => {
  const salt = import.meta.env.VITE_IP_SALT || '';
  return hashString(ip + salt);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const getRateLimitKey = (ipHash: string): string => {
  return `rateLimit/${ipHash}`;
};
import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptPromise = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scryptPromise(password, salt, 64)) as Buffer;

  return `${salt}:${derivedKey.toString('hex')}`;
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(':');
  const derivedKey = (await scryptPromise(password, salt, 64)) as Buffer;

  return timingSafeEqual(Buffer.from(key, 'hex'), derivedKey);
}

export {hashPassword, verifyPassword}


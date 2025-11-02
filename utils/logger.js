import { inspect } from 'util';
import { env } from '../configs/env.js';

const localIsoString = (d = new Date()) => {
  const pad = (n, z = 2) => String(n).padStart(z, '0');
  const ms = pad(d.getMilliseconds(), 3);
  const tzOffset = -d.getTimezoneOffset();
  const sign = tzOffset >= 0 ? '+' : '-';
  const absOffset = Math.abs(tzOffset);
  const hours = Math.floor(absOffset / 60);
  const minutes = absOffset % 60;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${ms}${sign}${pad(hours)}:${pad(minutes)}`;
};

const formatLog = (level, ...args) => {
  const ts = localIsoString();
  const combined = args
    .map(a => (typeof a === 'string' ? a : inspect(a, { depth: null })))
    .join(' ');
  return combined
    .split('\n')
    .map((line, i) => (i === 0 ? `${ts} - [${level}] ${line}` : `${ts}   ${line}`))
    .join('\n');
};

const isDev = env.nodeEnv === 'development';

export const logger = {
  info: (...args) => console.log(formatLog('INFO', ...args)),
  error: (...args) => console.error(formatLog('ERROR', ...args)),
  warn: (...args) => console.warn(formatLog('WARN', ...args)),
  debug: (...args) => {
    if (!isDev) return;
    console.debug(formatLog('DEBUG', ...args));
  },
};

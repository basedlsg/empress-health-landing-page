import { v4 as uuidv4 } from 'uuid';

export function getOrCreateAnonId(): string {
  let anonId = localStorage.getItem('anonId');
  if (!anonId) {
    anonId = uuidv4();
    localStorage.setItem('anonId', anonId);
  }
  return anonId;
}
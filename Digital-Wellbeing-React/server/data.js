import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const databasePath = path.join(directory, 'users.json');

export async function readUsers() {
  try {
    const contents = await fs.readFile(databasePath, 'utf8');
    const users = JSON.parse(contents);
    return Array.isArray(users) ? users : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function writeUsers(users) {
  const temporaryPath = `${databasePath}.tmp`;
  await fs.writeFile(temporaryPath, JSON.stringify(users, null, 2), 'utf8');
  await fs.rename(temporaryPath, databasePath);
}

export async function findUserByEmail(email) {
  const users = await readUsers();
  return users.find(user => user.email === email) ?? null;
}


const itemsPath = path.join(directory, 'items.json');

export async function readItems() {
  try {
    const contents = await fs.readFile(itemsPath, 'utf8');
    const items = JSON.parse(contents);
    return Array.isArray(items) ? items : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function writeItems(items) {
  const temporaryPath = `${itemsPath}.tmp`;
  await fs.writeFile(temporaryPath, JSON.stringify(items, null, 2), 'utf8');
  await fs.rename(temporaryPath, itemsPath);
}

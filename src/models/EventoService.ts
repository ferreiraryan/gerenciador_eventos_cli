// src/models/EventService.ts

import { promises as fs } from 'fs';
import path from 'path';
import { Evento } from './Evento';

const dbPath = path.join(__dirname, '..', '..', 'database', 'events.json');

export class EventService {

  private async ensureDbFileExists(): Promise<void> {
    try {
      await fs.access(dbPath);
    } catch (error) {
      await fs.mkdir(path.dirname(dbPath), { recursive: true });
      await fs.writeFile(dbPath, JSON.stringify([], null, 2));
    }
  }

  async readEvents(): Promise<Evento[]> {
    await this.ensureDbFileExists();
    const data = await fs.readFile(dbPath, 'utf-8');
    try {
      return JSON.parse(data) as Evento[];
    } catch (error) {
      console.error("Erro ao parsear o JSON do banco de dados. Retornando array vazio.", error);
      return [];
    }
  }

  async writeEvents(events: Evento[]): Promise<void> {
    await this.ensureDbFileExists();
    await fs.writeFile(dbPath, JSON.stringify(events, null, 2), 'utf-8');
  }
}

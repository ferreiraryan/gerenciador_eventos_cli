// src/views/EventView.ts

import inquirer from 'inquirer';
import { Evento } from '../models/Evento';

export class EventView {

  async showMainMenu(): Promise<string> {
    const { option } = await inquirer.prompt<{ option: string }>([
      {
        type: 'list',
        name: 'option',
        message: 'O que você deseja fazer?',
        choices: [
          { name: 'Adicionar Novo Evento', value: 'add' },
          { name: 'Listar Todos os Eventos', value: 'list' },
          { name: 'Buscar Eventos (por nome ou local)', value: 'search' },
          { name: 'Atualizar Evento', value: 'update' },
          { name: 'Cancelar Evento', value: 'cancel' },
          { name: 'Registrar Participante', value: 'register' },
          new inquirer.Separator(),
          { name: 'Sair', value: 'exit' },
        ],
      },
    ]);
    return option;
  }

  async getEventDetails(): Promise<Omit<Evento, 'id' | 'participantesAtuais' | 'status'>> {
    return inquirer.prompt([
      { type: 'input', name: 'nome', message: 'Nome do evento:', validate: input => input ? true : 'Nome é obrigatório.' },
      {
        type: 'input',
        name: 'data',
        message: 'Data do evento (YYYY-MM-DD):',
        validate: input => /^\d{4}-\d{2}-\d{2}$/.test(input) ? true : 'Formato de data inválido. Use YYYY-MM-DD.'
      },
      { type: 'input', name: 'local', message: 'Local do evento:', validate: input => input ? true : 'Local é obrigatório.' },
      {
        type: 'input',
        name: 'capacidadeMaxima',
        message: 'Capacidade máxima:',
        validate: input => {
          const num = parseInt(input, 10);
          return !isNaN(num) && num > 0 ? true : 'Capacidade deve ser um número positivo maior que zero.';
        },
        filter: input => parseInt(input, 10)
      }
    ]);
  }

  async selectEvent(events: Evento[]): Promise<string | null> {
    if (events.length === 0) {
      this.displayMessage("Nenhum evento encontrado para selecionar.");
      return null;
    }
    const { eventId } = await inquirer.prompt<{ eventId: string }>([
      {
        type: 'list',
        name: 'eventId',
        message: 'Selecione um evento:',
        choices: events.map(e => ({ name: `${e.nome} (${e.data}) - ${e.local}`, value: e.id }))
      }
    ]);
    return eventId;
  }

  async getSearchTerm(): Promise<string> {
    const { term } = await inquirer.prompt<{ term: string }>({
      type: 'input',
      name: 'term',
      message: 'Digite o nome ou local para buscar:'
    });
    return term;
  }

  displayEvents(events: Evento[]): void {
    if (events.length === 0) {
      console.log('Nenhum evento encontrado.');
      return;
    }
    console.table(events);
  }

  displayMessage(message: string): void {
    console.log(`\n✅ ${message}\n`);
  }

  displayError(message: string): void {
    console.error(`\n❌ ${message}\n`);
  }
}

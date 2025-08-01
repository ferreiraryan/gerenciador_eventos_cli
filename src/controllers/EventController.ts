// src/controllers/EventController.ts

import { v4 as uuidv4 } from 'uuid';
import { Evento } from '../models/Evento';
import { EventService } from '../models/EventoService';
import { EventView } from '../views/EventView';

export class EventController {
  constructor(
    private eventService: EventService,
    private eventView: EventView
  ) { }

  public async start(): Promise<void> {
    let loop = true;
    while (loop) {
      const option = await this.eventView.showMainMenu();
      switch (option) {
        case 'add':
          await this.addEvent();
          break;
        case 'list':
          await this.listEvents();
          break;
        case 'search':
          await this.searchEvents();
          break;
        case 'update':
          await this.updateEvent();
          break;
        case 'changeStatus':
          await this.changeEventStatus();
          break;
        case 'register':
          await this.registerParticipant();
          break;
        case 'exit':
          loop = false;
          this.eventView.displayMessage("Saindo da aplicação...");
          break;
        default:
          this.eventView.displayError('Opção inválida.');
          break;
      }
    }
  }

  private async addEvent(): Promise<void> {
    const eventDetails = await this.eventView.getEventDetails();
    const events = await this.eventService.readEvents();

    const isDuplicate = events.some(
      e => e.nome.toLowerCase() === eventDetails.nome.toLowerCase() && e.data === eventDetails.data
    );

    if (isDuplicate) {
      this.eventView.displayError('Já existe um evento com o mesmo nome e data.');
      return;
    }

    const newEvent: Evento = {
      ...eventDetails,
      id: uuidv4(),
      participantesAtuais: 0,
      status: 'agendado',
    };

    events.push(newEvent);
    await this.eventService.writeEvents(events);
    this.eventView.displayMessage('Evento adicionado com sucesso!');
  }

  private async listEvents(): Promise<void> {
    const events = await this.eventService.readEvents();
    this.eventView.displayEvents(events);
  }

  private async searchEvents(): Promise<void> {
    const term = await this.eventView.getSearchTerm();
    const events = await this.eventService.readEvents();
    const filteredEvents = events.filter(e =>
      e.nome.toLowerCase().includes(term.toLowerCase()) ||
      e.local.toLowerCase().includes(term.toLowerCase())
    );
    this.eventView.displayEvents(filteredEvents);
  }

  private async updateEvent(): Promise<void> {
    const events = await this.eventService.readEvents();
    const eventId = await this.eventView.selectEvent(events);
    if (!eventId) return;

    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) {
      this.eventView.displayError("Evento não encontrado.");
      return;
    }

    this.eventView.displayMessage("Digite os novos dados do evento (deixe em branco para manter o atual).");
    const updatedDetails = await this.eventView.getEventDetails(); // Reutilizamos o formulário de adição

    events[eventIndex] = { ...events[eventIndex], ...updatedDetails };

    await this.eventService.writeEvents(events);
    this.eventView.displayMessage("Evento atualizado com sucesso!");
  }

  private async changeEventStatus(): Promise<void> {
    const events = await this.eventService.readEvents();
    const eventId = await this.eventView.selectEvent(events);
    if (!eventId) return;

    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
      const oldStatus = events[eventIndex].status
      this.eventView.displayMessage(`O status atual é: ${oldStatus}`)
      const newStatus = await this.eventView.getNewStatus();
      if (newStatus == oldStatus) {
        this.eventView.displayError("O evento ja possui esse status!");
        return
      }
      events[eventIndex].status = newStatus;
      await this.eventService.writeEvents(events);

      this.eventView.displayMessage("Evento alterado com sucesso!");
    } else {
      this.eventView.displayError("Evento não encontrado.");
    }
  }

  private async registerParticipant(): Promise<void> {
    const events = await this.eventService.readEvents();
    const availableEvents = events.filter(e => e.status === 'agendado' && e.participantesAtuais < e.capacidadeMaxima);

    const eventId = await this.eventView.selectEvent(availableEvents);
    if (!eventId) return;

    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
      events[eventIndex].participantesAtuais++;
      await this.eventService.writeEvents(events);
      this.eventView.displayMessage("Participante registrado com sucesso!");
    } else {
      this.eventView.displayError("Evento não encontrado ou lotado.");
    }
  }
}

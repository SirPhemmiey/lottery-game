import { TicketDao, TicketExtended, TicketStatus } from "../TicketService/TicketDao";
import { ITicketRepository } from "../TicketService/TicketRepository";
import { ILineGenerator } from "./LineGenerator";

export class LotteryService {

    constructor(private ticketRepository: ITicketRepository,
        private ticketDao: TicketDao,
        private lineGenerator: ILineGenerator) { }

    async createLotteryTicket(numberOfLines: number) {
        if (numberOfLines <= 0) {
            throw new Error('Invalid number of lines')
        }
        const ticket = this.ticketRepository.generateTicket(numberOfLines);
        await this.ticketDao.addTicket(ticket);
        return ticket;
    }

    async updateTicketLines(numberOfLines: number, ticketId: string) {
        if (numberOfLines <= 0) {
            throw new Error('Invalid number of lines')
        }
        const ticket = await this.ticketDao.getTicketById(ticketId);
        const updatedTicket = await this.checkAndUpdateTicket(numberOfLines, ticket);
        return updatedTicket;
    }

    //this should only be accessible by this class only
    protected async checkAndUpdateTicket(numberOfLines: number, ticket: TicketExtended) {
        //let newLines: number[] = [];
        if (ticket.status === TicketStatus.NotChecked) {
            //const existingTicketLine = ticket.lines;
            for (let i = 0; i < numberOfLines; i++) {
                //newLines.push(this.lineGenerator.generateLine())
                ticket.lines.push({numbers: [this.lineGenerator.generateLine(), this.lineGenerator.generateLine(), this.lineGenerator.generateLine()]})
            }
            //ticket.lines = [...existingTicketLine, { numbers: newLines }];
            console.log({final: ticket.lines});
        } else {
            throw new Error('Ticket already checked so it cannot be amended');
        }
        await this.ticketDao.updateTicket(ticket._id, ticket);
        return ticket;
    }

    async checkTicketStatus(ticketId: string) {
        //TODO: validate that ticket id is valid and a string
        const ticket = await this.ticketDao.getTicketById(ticketId);
        ticket.status = TicketStatus.Checked;
        await this.ticketDao.updateTicket(ticketId, ticket);
        return ticket;
    }

    async getTicketStatus(ticketId: string) {
        //TODO: validate that ticket id is valid and a string
        const ticket = await this.ticketDao.getTicketById(ticketId);
        return ticket.status;
    }

    async getTicketById(ticketId: string) {
        const ticket = await this.ticketDao.getTicketById(ticketId);
        return ticket;
    }

    async getAllTickets() {
        return this.ticketDao.getTickets();
    }

    async deleteAll() {
        return this.ticketDao.deleteAll();
    }
}
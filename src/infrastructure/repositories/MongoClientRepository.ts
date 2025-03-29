import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { Client } from "../../domain/entities/Client";
import { ClientModel } from "../models/ClientModel";
import {
  PaginationParams,
  PaginatedResponse,
  PaginationLinks,
  PaginationMeta,
} from "../../domain/interfaces/PaginationParams";

export class MongoClientRepository implements IClientRepository {
  async create(client: Client): Promise<Client> {
    const newClient = await ClientModel.create(client);
    return newClient.toObject() as Client;
  }

  async findById(id: string): Promise<Client | null> {
    const client = await ClientModel.findById(id);
    return client ? (client.toObject() as Client) : null;
  }

  async findByGymId(
    gymId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Client>> {
    const {
      page,
      limit,
      sortBy = "createdAt",
      sortOrder = "desc",
      path = "",
    } = pagination;
    const skip = (page - 1) * limit;

    const [clients, total] = await Promise.all([
      ClientModel.find({ gymId })
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .exec(),
      ClientModel.countDocuments({ gymId }),
    ]);

    const lastPage = Math.ceil(total / limit);
    const from = skip + 1;
    const to = Math.min(skip + limit, total);

    const links: PaginationLinks = {
      first: `${path}?page=1&limit=${limit}`,
      last: `${path}?page=${lastPage}&limit=${limit}`,
      prev: page > 1 ? `${path}?page=${page - 1}&limit=${limit}` : null,
      next: page < lastPage ? `${path}?page=${page + 1}&limit=${limit}` : null,
    };

    const meta: PaginationMeta = {
      current_page: page,
      from,
      last_page: lastPage,
      path,
      per_page: limit,
      to,
      total,
      links: this.generateMetaLinks(page, lastPage, limit, path),
    };

    return {
      data: clients.map((client) => client.toObject() as Client),
      links,
      meta,
    };
  }

  private generateMetaLinks(
    currentPage: number,
    lastPage: number,
    limit: number,
    path: string
  ) {
    const links = [];

    // Previous page
    if (currentPage > 1) {
      links.push({
        url: `${path}?page=${currentPage - 1}&limit=${limit}`,
        label: "&laquo; Previous",
        active: false,
      });
    }

    // Page numbers
    for (let i = 1; i <= lastPage; i++) {
      if (
        i === 1 || // First page
        i === lastPage || // Last page
        (i >= currentPage - 2 && i <= currentPage + 2) // Pages around current
      ) {
        links.push({
          url: `${path}?page=${i}&limit=${limit}`,
          label: i.toString(),
          active: i === currentPage,
        });
      } else if (
        (i === currentPage - 3 && currentPage > 4) ||
        (i === currentPage + 3 && currentPage < lastPage - 3)
      ) {
        links.push({
          url: null,
          label: "...",
          active: false,
        });
      }
    }

    // Next page
    if (currentPage < lastPage) {
      links.push({
        url: `${path}?page=${currentPage + 1}&limit=${limit}`,
        label: "Next &raquo;",
        active: false,
      });
    }

    return links;
  }

  async findByCi(ci: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ ci });
    return client ? (client.toObject() as Client) : null;
  }

  async update(id: string, client: Partial<Client>): Promise<Client | null> {
    const updatedClient = await ClientModel.findByIdAndUpdate(
      id,
      { ...client, updatedAt: new Date() },
      { new: true }
    );
    return updatedClient ? (updatedClient.toObject() as Client) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ClientModel.findByIdAndDelete(id);
    return !!result;
  }
}

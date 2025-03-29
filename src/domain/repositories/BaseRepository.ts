import {
  PaginationParams,
  PaginatedResponse,
  PaginationLinks,
  PaginationMeta,
} from "../interfaces/PaginationParams";
import { Model, Document } from "mongoose";

export abstract class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  protected async paginate(
    query: any,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<T>> {
    const {
      page,
      limit,
      sortBy = "createdAt",
      sortOrder = "desc",
      path = "",
    } = pagination;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.model
        .find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.model.countDocuments(query),
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
      data: items,
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
}

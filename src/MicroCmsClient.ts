type List<T> = {
  contents: T[];
  limit: number;
  offset: number;
  totalCount: number;
};
export class MicroCmsClient<T> {
  constructor(
    readonly endpoint: string,
    readonly content: string,
    readonly header: string,
  ) {}
  list(offset: number, query?: Record<string, string | undefined>): Promise<List<T>> {
    return this.get(this.content, { offset: offset.toString(), ...query });
  }
  item(id: string): Promise<T> {
    return this.get(`${this.content}/${id}`);
  }
  private get(path: string, query: Record<string, string> = {}) {
    const queryString = new URLSearchParams(query)?.toString() ?? "";
    return fetch(
      `https://${this.endpoint}.microcms.io/api/v1/${path}${queryString !== "" ? "?" + queryString : ""}`,
      {
        headers: { "X-MICROCMS-API-KEY": this.header },
      },
    ).then((it) => it.json());
  }
}

export const client = new MicroCmsClient<{
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  categories: Array<{
    id: string;
    name: string;
  }>
}>("ku-tech", "blogs", "XZFkLvLrr209UvvuQBAUH4RxR6SBIVIUo2pq");

export const categoriesClient = new MicroCmsClient<{
  id: string;
  name: string;
}>("ku-tech", "categories", "XZFkLvLrr209UvvuQBAUH4RxR6SBIVIUo2pq");

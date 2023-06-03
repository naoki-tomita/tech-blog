
type List<T> = {
  contents: T[],
  limit: number,
  offset: number,
  totalCount: number,
}
export class MicroCmsClient<T> {
  constructor(readonly endpoint: string, readonly content: string, readonly header: string) {}
  list(): Promise<List<T>> {
    return this.get(this.content);
  }
  item(id: string): Promise<T> {
    return this.get(`${this.content}/${id}`)
  }
  private get(path: string) {
    return fetch(`https://${this.endpoint}.microcms.io/api/v1/${path}`, { headers: { "X-MICROCMS-API-KEY": this.header } }).then(it => it.json());
  }
}

export const client = new MicroCmsClient<{
  id: string
  title: string,
  content: string,
  publishedAt: string,
}>("ku-tech", "blogs", "XZFkLvLrr209UvvuQBAUH4RxR6SBIVIUo2pq");

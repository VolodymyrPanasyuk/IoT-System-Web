import type { AxiosInstance } from 'axios'

export class ApiClient<TEntity, TCreateDto = Partial<TEntity>, TUpdateDto = Partial<TEntity>> {
  constructor(
    protected api: AxiosInstance,
    protected endpoint: string
  ) { }

  async getAll(): Promise<TEntity[]> {
    const response = await this.api.get<TEntity[]>(this.endpoint)
    return response.data
  }

  async getById(id: string): Promise<TEntity> {
    const response = await this.api.get<TEntity>(`${this.endpoint}/${id}`)
    return response.data
  }

  async create(data: TCreateDto): Promise<TEntity> {
    const response = await this.api.post<TEntity>(this.endpoint, data)
    return response.data
  }

  async update(id: string, data: TUpdateDto): Promise<TEntity> {
    const response = await this.api.put<TEntity>(`${this.endpoint}/${id}`, data)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`${this.endpoint}/${id}`)
  }
}

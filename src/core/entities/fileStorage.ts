export default interface FileStorageInterface {
  save(file: Buffer, filename: string, locale: string): Promise<void>
  get(filename: string, locale: string): Promise<any>
  destroy(filename: string, locale: string): Promise<void>
}
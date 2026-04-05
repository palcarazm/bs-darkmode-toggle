export interface StorageProvider {
  get(key: string): string | null;
  set(key: string, value: string, ttl: number): void;
  delete(key: string): void;
}
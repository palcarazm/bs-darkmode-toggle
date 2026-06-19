export interface StorageProvider {
  /**
   * Retrieves a value from storage.
   * @param {string} key The key of the record to retrieve.
   * @returns {string | null} The value associated with the key, or `null` if not found.
   * @throws {Error} If storage is unavailable or access is denied.
   */
  get(key: string): string | null;
  
  /**
   * Sets a value in storage.
   * @param {string} key The key of the record to set.
   * @param {string} value The value to set for the record.
   * @param {number} ttl The time-to-live for the record.
   * @throws {Error} If storage is unavailable or access is denied.
   */
  set(key: string, value: string, ttl: number): void;

  /**
   * Deletes a value from storage.
   * @param {string} key The key of the record to delete.
   * @throws {Error} If storage is unavailable or access is denied.
   */
  delete(key: string): void;
}
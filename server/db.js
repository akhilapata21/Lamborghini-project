import fs from 'fs/promises';
import path from 'path';

class JSONDatabase {
  constructor(filename) {
    this.filepath = path.resolve(filename);
    this.lockPromise = Promise.resolve();
  }

  // Ensure file and directories exist
  async ensureFile() {
    try {
      await fs.mkdir(path.dirname(this.filepath), { recursive: true });
      await fs.access(this.filepath);
    } catch (e) {
      // Create with empty array
      await this._writeAtomically([]);
    }
  }

  // Internal helper to perform atomic write
  async _writeAtomically(data) {
    const tmpPath = `${this.filepath}.tmp`;
    const jsonStr = JSON.stringify(data, null, 2);
    await fs.writeFile(tmpPath, jsonStr, 'utf8');
    await fs.rename(tmpPath, this.filepath);
  }

  // Safe queue execution to prevent write collisions
  async _queue(operation) {
    const nextPromise = this.lockPromise.then(async () => {
      await this.ensureFile();
      return operation();
    });
    this.lockPromise = nextPromise.catch(() => {}); // prevent lock rejection breakages
    return nextPromise;
  }

  // Read all records
  async getAll() {
    return this._queue(async () => {
      const content = await fs.readFile(this.filepath, 'utf8');
      try {
        return JSON.parse(content) || [];
      } catch (e) {
        console.error("Failed to parse database file. Resetting.", e);
        return [];
      }
    });
  }

  // Find record by ID
  async getById(id) {
    const records = await this.getAll();
    return records.find(r => r.id === id) || null;
  }

  // Insert a new record
  async insert(record) {
    return this._queue(async () => {
      const content = await fs.readFile(this.filepath, 'utf8');
      let records = [];
      try {
        records = JSON.parse(content) || [];
      } catch (e) {
        records = [];
      }
      
      const newRecord = {
        id: `LMB-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        ...record,
        status: record.status || 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      records.push(newRecord);
      await this._writeAtomically(records);
      return newRecord;
    });
  }

  // Update a record
  async update(id, updates) {
    return this._queue(async () => {
      const content = await fs.readFile(this.filepath, 'utf8');
      let records = [];
      try {
        records = JSON.parse(content) || [];
      } catch (e) {
        return null;
      }

      const idx = records.findIndex(r => r.id === id);
      if (idx === -1) return null;

      const updatedRecord = {
        ...records[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      records[idx] = updatedRecord;
      await this._writeAtomically(records);
      return updatedRecord;
    });
  }

  // Delete a record
  async delete(id) {
    return this._queue(async () => {
      const content = await fs.readFile(this.filepath, 'utf8');
      let records = [];
      try {
        records = JSON.parse(content) || [];
      } catch (e) {
        return false;
      }

      const originalLength = records.length;
      records = records.filter(r => r.id !== id);
      
      if (records.length === originalLength) {
        return false;
      }

      await this._writeAtomically(records);
      return true;
    });
  }
}

export default JSONDatabase;

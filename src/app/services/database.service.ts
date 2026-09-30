import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database!: SQLiteObject;
  private DB_NAME = environment.database;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  async initializeDatabase(): Promise<SQLiteObject> {
    try {
      this.database = await this.sqlite.create({
        name: this.DB_NAME,
        location: 'default',
      });

      console.log('Database initialized successfully');

      return this.database;
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  async connectDB(): Promise<SQLiteObject> {
    if (!this.database) {
      console.log('Database not initialized...Reinitializing database');
      this.initializeDatabase();
    }

    return this.database;
  }

    connectDB2(): SQLiteObject {
    if (!this.database) {
      console.log('Database not initialized...Reinitializing database');
      this.initializeDatabase();
    }

    return this.database;
  }
}

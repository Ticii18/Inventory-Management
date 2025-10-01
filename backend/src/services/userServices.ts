import { query } from "../database"

export const userService = {
  async getAllUsers() {
    const result = await query("SELECT * FROM users");
    return result.rows;
  },

  async createUser(name: string, email: string) {
    const result = await query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  }
};

import { query } from "../../db/mysql";
import { User } from "../domain/User";
import { UserRepository } from "../domain/userRepository/UserRepository";

export class MysqlUserRepository implements UserRepository {
  async updateUserToken(id_user: number, id_token: string): Promise<User | null> {
    try {
      const sql = "UPDATE users SET id_token = ? WHERE id_user = ?";
      const params: any[] = [id_token, id_user]; // Corregido el orden de los parámetros
      
      const [result]: any = await query(sql, params);
      
      if (result.affectedRows > 0) {
        return this.getById(id_user);
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Error en updateUserToken:", error);
      throw new Error("Error actualizando el token del usuario");
    }
  }
  
  
  async deleteUserToken(id_user: number): Promise<User | null> {
    try {
      console.log(id_user,"holahola2")
      const sql = "UPDATE users SET id_token = NULL WHERE id_user = ?";
      const params: any[] = [id_user];
      const [result]: any = await query(sql, params);
  
      if (result.affectedRows > 0) {
        return this.getById(id_user);
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Error en deleteUserToken:", error);
      throw new Error("Error eliminando el token del usuario");
    }
  }
  
  async registerUser(
    name: string,
    email: string,
    password: string,
    surname: string,
    last_name: string,
    id_role: number,
    id_token: string,

  ): Promise<User | null> {
    console.log(id_role);
    let user = null;
    const sql =
      "INSERT INTO users (name, email, password, surname, last_name ,id_role, id_token  ) VALUES (?,?,?,?,?,?,?)";
    const params: any[] = [ 
      name,
      email,
      password,
      surname,
      last_name,
      id_role,
      id_token
    ];
    try {
      const [userR]: any = await query(sql, params);
      user = new User(
        userR.id,
        name,
        email,
        password,
        last_name,
        surname,
        id_role,
        id_token
      );
    } catch (error) {
      user = null;
    } finally {
      return user;
    }
  }

  async getUsers(): Promise<User[] | null> {
    const sql = "SELECT * FROM users";
    try {
      const [data]: any = await query(sql, []);

      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));

      return dataUsers.map(
        (user: any) =>
          new User(
            user.id_user,
            user.name,
            user.email,
            user.password,
            user.last_name,
            user.surname,
            user.id_role,
            user.id_token
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(id_user: number): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE id_user=?";
    const params: any[] = [id_user];

    try {
      const [result]: any = await query(sql, params);
      return new User(
        result[0].id_user,
        result[0].name,
        result[0].email,
        result[0].password,
        result[0].last_name,
        result[0].surname,
        result[0].id_role,
        result[0].id_token
      );
    } catch (error) {
      return null;
    }
  }
  async getbyEmail(email: string): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE email=?";
    const params: any[] = [email];

    try {
      const [result]: any = await query(sql, params);

      return new User(
        result[0].id_user,
        result[0].name,
        result[0].email,
        result[0].password,
        result[0].last_name,
        result[0].surname,
        result[0].id_role,
        result[0].id_token
      );
    } catch (error) {
      return null;
    }
  }
}

/* eslint-disable prettier/prettier */
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
      const userAlreadyExist = this.usersRepository.findByEmail(email)
     
      if(userAlreadyExist) {
        throw new Error("Este email já existe");
      }

      this.usersRepository.create({ email, name })
      
      const user = this.usersRepository.findByEmail(email)

      return user
  }
}

export { CreateUserUseCase };

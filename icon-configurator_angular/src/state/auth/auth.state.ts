//TODO
import User from "../../models/user";

export interface AuthState {
  status: {
    loggedIn: false;
  }
  user: User
}

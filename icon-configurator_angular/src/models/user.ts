export default class User{

  username: string;
  prename: string;
  name: string;
  password: string;
  isEmptyUser: boolean;

    constructor(username: string, prename: string, name: string, password: string, isEmptyUser = false){
      this.username = username;
      this.prename = prename;
      this.name = name;
      this.password = password;
      this.isEmptyUser = isEmptyUser;
    }
}

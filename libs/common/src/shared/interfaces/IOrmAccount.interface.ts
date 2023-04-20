export interface IOrmAccount {

  id: number;
  login: string;
  email: string;
  password: string;
  status: string;
  avatar: string;
  moderation_level: number;
  projects: any;

}

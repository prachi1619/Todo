export class SignUpDto{
  public id?: number;
  public first_name?: string;
  public last_name?: string;
  public email!: string;
  public password?: string;
  public is_active?: boolean;
  public created_at?: Date;
  public updated_at?: Date;
}

export class modelResult {
  constructor(
    public message: string,
    public sucess: boolean,
    public data: any,
    public error: any,
    public status: number,
  ) {}
}

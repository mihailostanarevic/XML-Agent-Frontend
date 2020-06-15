export class Ad {
  constructor(
    public id: string,
    public photos: string[],
    public dateFrom: string,
    public dateTo: string,
    public timeFrom: string,
    public timeTo: string,
    public pickUpAddressID: string
  ) {}
}

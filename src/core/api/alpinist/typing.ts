export interface IGetALpinistsResponse {
  alpinists: IAlpinist[];
  country: string;
  draft: { id: number };
  user: { email: string; ID: number };
}

export interface IAlpinist {
  id: number;
  name: string;
  lifetime: string;
  country: string;
  imageRef: string;
  imageName: string;
  description: string;
  Status: string;
}

export interface IGetALpinistsByIdResponse {
  alpinist: IAlpinist;
}

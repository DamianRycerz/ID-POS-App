export interface PersonDTO {
  readonly message: string;
  readonly result: {
    properties: {
      height: string;
      mass: string;
      hair_color: string;
      skin_color: string;
      eye_color: string;
      birth_year: string;
      gender: string;
      created: string;
      edited: string;
      name: string;
      homeworld: string;
      url: string;
    };
    readonly description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}

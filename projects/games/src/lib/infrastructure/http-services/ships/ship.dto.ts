export interface ShipDTO {
  readonly message: string;
  readonly result: {
    readonly properties: {
      model: string;
      starship_class: string;
      manufacturer: string;
      cost_in_credits: string;
      length: string;
      crew: string;
      passengers: string;
      max_atmosphering_speed: string;
      hyperdrive_rating: string;
      MGLT: string;
      cargo_capacity: string;
      consumables: string;
      created: string;
      edited: string;
      name: string;
      url: string;
    };
    readonly description: string;
    readonly _id: string;
    readonly uid: string;
    readonly __v: number;
  };
}

export type Device = {
  id: string;
  plantId: string;
  description: string;
  schemaReference: string;
  manufacturer: string;
  fabricate: string;
  electrical: {
    voltage: number;
    current: number;
    power: number;
  };
  dataPoints: [
    {
      type: string;
      description: string;
      comment: string;
    }
  ];
};

export type EmptyDevice = Omit<Device, "id">;

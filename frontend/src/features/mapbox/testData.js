export const circles = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [11.4451, 46.743],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [11.4471, 46.7426],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [11.442, 46.7407],
      },
    },
  ],
};

export const exampleTemp = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [11.4451, 46.743] },
      properties: { temperature: 18.3 },
    },
    {
        type: "Feature",
        geometry: { type: "Point", coordinates: [11.4471, 46.7426] },
        properties: { temperature: 17.2 },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [11.442, 46.7407] },
        properties: { temperature: 18 },
      },
  ],
};

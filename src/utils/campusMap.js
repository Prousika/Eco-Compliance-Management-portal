export const BAIET_CAMPUS_CENTER = {
  lat: 11.4986,
  lng: 77.2743,
};

export const BAIET_CAMPUS_BOUNDS = {
  north: 11.5068,
  south: 11.4904,
  east: 77.2828,
  west: 77.2658,
};

export const BAIET_MAP_OPTIONS = {
  restriction: {
    latLngBounds: BAIET_CAMPUS_BOUNDS,
    strictBounds: true,
  },
  minZoom: 15,
  maxZoom: 20,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

export const BAIET_BLOCK_COORDS = {
  IB: { lat: 11.4993, lng: 77.2729, zone: "Central Campus Zone" },
  AS: { lat: 11.5008, lng: 77.2736, zone: "North Campus Zone" },
  SF: { lat: 11.4979, lng: 77.2761, zone: "Central Campus Zone" },
  MECH: { lat: 11.5011, lng: 77.2758, zone: "North Campus Zone" },
  CAFETARIA: { lat: 11.4967, lng: 77.2734, zone: "South Campus Zone" },
  Ground: { lat: 11.4949, lng: 77.2768, zone: "South Campus Zone" },
  Parking: { lat: 11.4957, lng: 77.2718, zone: "South Campus Zone" },
  "Girls Hostel": { lat: 11.5031, lng: 77.2781, zone: "Hostel Zone" },
  "Boys Hostel": { lat: 11.4928, lng: 77.2784, zone: "Hostel Zone" },
  Others: { lat: 11.4986, lng: 77.2743, zone: "Campus Zone" },
  "Block A": { lat: 11.5004, lng: 77.2726, zone: "Academic Core" },
  "Block B": { lat: 11.4990, lng: 77.2748, zone: "Academic Core" },
  "Block C": { lat: 11.5018, lng: 77.2747, zone: "Academic Core" },
  "IB Block": { lat: 11.4993, lng: 77.2729, zone: "Central Campus Zone" },
  "Playground Area": { lat: 11.4949, lng: 77.2768, zone: "Sports Zone" },
  "Academic Block A": { lat: 11.5004, lng: 77.2726, zone: "Academic Core" },
  "Library Block": { lat: 11.4985, lng: 77.2763, zone: "Academic Core" },
  "Sports Complex": { lat: 11.4944, lng: 77.2776, zone: "Sports Zone" },
  "Hostel Block": { lat: 11.5031, lng: 77.2781, zone: "Hostel Zone" },
};

export const getCampusPoint = (block, index = 0) =>
  BAIET_BLOCK_COORDS[block] || {
    lat: BAIET_CAMPUS_CENTER.lat + (index % 4) * 0.00035 - 0.0005,
    lng: BAIET_CAMPUS_CENTER.lng + (index % 3) * 0.0004 - 0.0004,
    zone: "Campus Zone",
  };

export const getBlockPoint = (block) => getCampusPoint(block, 0);

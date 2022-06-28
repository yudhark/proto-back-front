export interface APIInterface {
  method?: number;
  url?: string;
  published?: boolean;
  desc?: string;
}

export const HTTP_COLOR_METHOD: Array<{ id: number; name: string; color: string }> = [
  { id: 0, name: "GET", color: "#ECE3D6" },
  { id: 1, name: "POST", color: "#F7EAE6" },
  { id: 2, name: "DELETE", color: "#D2E0E1" },
  { id: 3, name: "PUT", color: "#9CD2D8" },
  { id: 4, name: "PATCH", color: "#61B5BD" },
  { id: 5, name: "OPTIONS", color: "#3B6468" },
];

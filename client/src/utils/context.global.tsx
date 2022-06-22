import React, { useState } from "react";

type NavType = {
  url?: string;
  seturl?: React.Dispatch<React.SetStateAction<string>>;
};

export const NavContext = React.createContext<NavType>({});
export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [url, seturl] = useState<string>("home");
  return <NavContext.Provider value={{ url, seturl }}>{children}</NavContext.Provider>;
};

export const ColorTheme: Array<string> = ["#F8B195", "#F67280", "#C06C84", "#6C5B7B", "#355C7D", "#EDDCD2", "#FFA4B6"];
export const MonthList: Array<string> = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
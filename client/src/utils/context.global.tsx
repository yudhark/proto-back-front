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
export const MethodTheme: Array<{ primary: string; secondary: string; name: string }> = [
  { primary: "#46cfb0", secondary: "#34bc9d", name: "GET" },
  { primary: "#ffcd69", secondary: "#f6ba59", name: "POST" },
  { primary: "#ed5565", secondary: "#da4453", name: "DELETE" },
  { primary: "#5e9de6", secondary: "#4b8ad6", name: "PUT" },
  { primary: "#ad93e6", secondary: "#977bd5", name: "PATCH" },
  { primary: "#ed87bd", secondary: "#d870a9", name: "OPTIONS" },
  { primary: "#ccd1d8", secondary: "#aab2bc", name: "" },
];
export const MonthList: Array<string> = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

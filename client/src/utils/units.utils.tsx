export enum VOLUME {
  LITER = "liter",
  MILLILITER = "milliliter",
  GALLON = "gallon",
  FLUID = "fluid-ounce"
}

export enum TEMP {
  CELSIUS = "celsius",
  FAHRENHEIT = "fahrenheit"
}

export enum MASS {
  KG = "kilogram", GR = "gram", ONS = "ounce", PND = "pound"
}

export enum AREA {
  ACRE= "acre", HECTARE = "hectare"
}

export enum CONCENTRATION {
  PERCENT = "percent"
}

export enum LENGTH {
  METER = "meter", MM = "millimeter", CM = "centimeter", INCH = "inch", MIL = "mile"
}

export interface UNITTYPE {
  type: VOLUME | TEMP | MASS | AREA | CONCENTRATION | LENGTH
}

export const DefineUnit = (type: UNITTYPE): string => {
  return type.toString();
}
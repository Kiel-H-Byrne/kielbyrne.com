import personasData from "./personas.json";

export interface Persona {
  id: string;
  name: string;
  hat: string;
  role: string;
  source: string;
  image: string;
  tagBg: string;
  accentColor: string;
  glowColor: string;
  borderColor: string;
  tagline: string;
  realWorldHat: string;
}

export const personas: Persona[] = personasData as Persona[];

export default personas;

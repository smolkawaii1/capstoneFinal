import { BaseKey } from "@pankod/refine-core";

export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
  sectorType: string;
  fund: number | undefined;
  proponents: string;
  duration: string;
  source: string;
}

export interface ProjectCardProps {
  id?: BaseKey | undefined;
  title: string;
  fund: string;
  duration: string;
  proponent: string;
  source: string;
  sectorType: string;
  status: string;
}

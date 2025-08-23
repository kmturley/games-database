export interface PlatformInterface {
  released?: string;
  requirements?: PlatformRequirements;
  features?: string[];
  notes?: string;
}

export interface PlatformRequirements {
  minimum?: string;
  recommended?: string;
}

export enum PlatformType {
  Android = 'android',
  IOS = 'ios',
  Linux = 'linux',
  Mac = 'mac',
  PS5 = 'ps5',
  Switch = 'switch',
  Xbox = 'xbox',
  Windows = 'windows',
}

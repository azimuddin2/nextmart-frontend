export interface ClientInfo {
  device: string;
  browser: string;
  ipAddress: string;
  pcName: string;
  os: string;
  userAgent: string;
}

export interface IUser {
  clientInfo?: ClientInfo;
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
  hasShop?: boolean;
  isActive?: boolean;
  otpToken?: any;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

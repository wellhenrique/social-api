export type Context = {
  mode: string;
  screen?: string;
  phoneModel?: string;
  batteryPercentage?: number;
  nfe?: any;
  cte?: any;
  lastSendFileDate?: string;

  company?: {
    name: string;
    owner: string;
    token: string;
  };
  user?: {
    id: string;
    email: string;
    company: string;
    username: string;
    mobilePhone?: string;
    phoneModel?: string;
  };
  delivery?: {
    id: string;
    key: string;
  };

  error: {
    originalErrorMessage: string;
    message: string;
    statusCode: number;
  };
};

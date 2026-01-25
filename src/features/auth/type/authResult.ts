export type AuthResult =
  | {
      isSuccess: true;
      data?: {
        redirectUrl?: string;
      };
    }
  | {
      isSuccess: false;
      error: {
        message: string;
      };
    };

export type CompanyActionResult =
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


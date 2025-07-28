export type SignOutActionResult =
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

import { REQUEST_CATEGORIES } from '@/consts/requestsCategory';

export type RequestCategoryType = (typeof REQUEST_CATEGORIES)[keyof typeof REQUEST_CATEGORIES]['value'];

import { SetMetadata } from "@nestjs/common";

export enum UserRole {
  SUPERADMIN = "superadmin",
  MODERATOR = "moderator",
  USER = "user",
}

export enum Language {
  UZ = "uz",
  RU = "ru",
  EN = "en",
}

export enum MaturityLevel {
  ZERO_PLUS = "0+",
  SIX_PLUS = "6+",
  TWELVE_PLUS = "12+",
  SIXTEEN_PLUS = "16+",
  EIGHTEEN_PLUS = "18+",
}

export enum VideoQuality {
  SD = "SD",
  HD = "HD",
  FHD = "FHD",
  UHD = "UHD",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum Currency {
  USD = "USD",
  UZS = "UZS",
  RUB = "RUB",
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  PENDING = "pending",
  CANCELED = "canceled",
}

export enum BillingPeriod {
  MONTHLY = "monthly",
  YEARLY = "yearly",
  WEEKLY = "weekly",
}

export enum DeviceType {
  MOBILE = "mobile",
  PC = "pc",
  TV = "TV",
}

export enum OS {
  ANDROID = "android",
  IOS = "ios",
  WINDOWS = "windows",
  LINUX = "linux",
}

export enum ThumbnailType {
  POSTER = "poster",
  BACKGROUND = "background",
  THUMBNAIL = "thumbnail",
}

export enum ContentType {
  MOVIE = "movie",
  SERIES = "series",
}

export enum PersonRole {
  ACTOR = "actor",
  DIRECTOR = "director",
  PRODUCER = "producer",
  WRITER = "writer",
}

export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

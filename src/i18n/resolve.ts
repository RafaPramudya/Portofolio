import {
  defaultLocale,
  locales,
  type Locale,
  type Localized,
} from "./config.ts";

/**
 * Turns a source type that may contain `Localized` values into the shape the
 * page actually renders: every `{ id, en }` pair collapsed to one string.
 */
export type Resolved<T> = T extends Localized<infer U>
  ? Resolved<U>
  : T extends readonly (infer U)[]
    ? Resolved<U>[]
    : T extends object
      ? { [K in keyof T]: Resolved<T[K]> }
      : T;

/**
 * Structural detection keeps the data files free of wrapper classes: anything
 * shaped exactly like `{ id, en }` is treated as a translation pair, while a
 * project (which also happens to have an `id`) is not.
 */
export function isLocalized(value: unknown): value is Localized<unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return (
    keys.length === locales.length &&
    locales.every((locale) => keys.includes(locale))
  );
}

/** Resolve every translation pair in `value` for one locale. */
export function resolve<T>(
  value: T,
  locale: Locale = defaultLocale,
): Resolved<T> {
  if (isLocalized(value)) {
    return resolve(value[locale], locale) as Resolved<T>;
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolve(item, locale)) as Resolved<T>;
  }

  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      output[key] = resolve(item, locale);
    }
    return output as Resolved<T>;
  }

  return value as Resolved<T>;
}

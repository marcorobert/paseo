import Constants from "expo-constants";
import appPackage from "../../package.json";

/** Display-only marker for this custom Paseo build. Keep the semantic version unchanged. */
export const APP_BUILD_VARIANT = process.env.EXPO_PUBLIC_PASEO_BUILD_VARIANT?.trim() || "pep";

function toVersionOrNull(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }

  return trimmed;
}

export function resolveAppVersion(): string | null {
  const packageVersion = toVersionOrNull(appPackage?.version);
  if (packageVersion) {
    return packageVersion;
  }

  const expoVersion = toVersionOrNull(Constants.expoConfig?.version);
  if (expoVersion) {
    return expoVersion;
  }

  const manifestVersion = toVersionOrNull(
    (Constants as unknown as { manifest?: { version?: unknown } }).manifest?.version,
  );
  if (manifestVersion) {
    return manifestVersion;
  }

  return null;
}

export function resolveAppVersionLabel(): string | null {
  const version = resolveAppVersion();
  return version ? `${version} (${APP_BUILD_VARIANT})` : null;
}

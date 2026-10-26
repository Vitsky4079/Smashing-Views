import "server-only";
import type { DurationOption } from "@/data/pricing";
import type { LivePanelService, PublicSupplierService } from "./types";

/**
 * Admin-configurable mapping: public package → supplier service ID.
 * Public retail price is NEVER derived from supplier rate.
 *
 * IDs below are the ones observed on the LivePanel catalog (Facebook LIVE) and MUST be
 * validated against the live `services` response (`validateMapping`) before any production use.
 */
export type PackageMapping = {
  platform: "facebook-live";
  durationMinutes: DurationOption | 30;
  supplierServiceId: number;
  enabled: boolean;
};

export const PACKAGE_MAPPINGS: PackageMapping[] = [
  { platform: "facebook-live", durationMinutes: 60, supplierServiceId: 511, enabled: true },
  { platform: "facebook-live", durationMinutes: 90, supplierServiceId: 512, enabled: true },
  { platform: "facebook-live", durationMinutes: 120, supplierServiceId: 513, enabled: true },
  { platform: "facebook-live", durationMinutes: 150, supplierServiceId: 514, enabled: true },
];

export type MappingCheck = {
  mapping: PackageMapping;
  status: "ok" | "missing" | "disabled";
  /** Supplier limits so quantity can be validated; no pricing included. */
  supplier?: PublicSupplierService;
};

/** Cross-check configured mappings against the current supplier catalog. */
export function validateMapping(catalog: LivePanelService[]): MappingCheck[] {
  const byId = new Map(catalog.map((s) => [Number(s.service), s]));
  return PACKAGE_MAPPINGS.map((mapping) => {
    if (!mapping.enabled) return { mapping, status: "disabled" as const };
    const s = byId.get(mapping.supplierServiceId);
    if (!s) return { mapping, status: "missing" as const };
    return { mapping, status: "ok" as const, supplier: toPublicSupplierService(s) };
  });
}

/** Strips supplier cost. Always use this before returning anything to a client. */
export function toPublicSupplierService(s: LivePanelService): PublicSupplierService {
  return { serviceId: Number(s.service), name: s.name, min: Number(s.min), max: Number(s.max) };
}

export function isQuantityWithinSupplierLimits(quantity: number, s: PublicSupplierService): boolean {
  return Number.isInteger(quantity) && quantity >= s.min && quantity <= s.max;
}

/** Types for the LivePanel (supplier) API. SERVER ONLY — never import in client components. */

export type LivePanelService = {
  service: number;
  name: string;
  type?: string;
  category?: string;
  /** Supplier (wholesale) rate — must NEVER leave the server. */
  rate: string;
  min: string;
  max: string;
  refill?: boolean;
  cancel?: boolean;
};

export type LivePanelOrderStatus = {
  charge?: string;
  start_count?: string;
  status: string;
  remains?: string;
  currency?: string;
};

export type LivePanelBalance = { balance: string; currency: string };

export type LivePanelErrorCode =
  | "not_configured"
  | "rate_limited"
  | "unauthorized"
  | "upstream_error"
  | "timeout"
  | "invalid_response"
  | "orders_disabled";

export class LivePanelError extends Error {
  constructor(
    public readonly code: LivePanelErrorCode,
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "LivePanelError";
  }
}

/** Customer-safe projection of a supplier service: NO rate/cost fields. */
export type PublicSupplierService = {
  serviceId: number;
  name: string;
  min: number;
  max: number;
};

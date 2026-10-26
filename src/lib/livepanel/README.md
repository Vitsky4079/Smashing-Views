# LivePanel integration layer (server only)

- `client.ts` — typed POST client (`services`, `status`, `balance`, gated `add`). Imports `server-only`, so any attempt to bundle it into client code fails the build.
- `mapping.ts` — admin-editable map from public packages to supplier service IDs + validation against the live catalog (`validateMapping`) and quantity-limit checks.
- `types.ts` — supplier types and `PublicSupplierService` (no wholesale rate).

## Rules
1. Retail prices live only in `src/data/pricing.ts`. Supplier `rate` is never read into public data and never returned by any route.
2. `livePanel.add()` is not referenced by any route. It throws unless `LIVEPANEL_ORDERS_ENABLED=true`. Enabling automated orders requires a separate authenticated + payment-confirmed workflow (not built).
3. Currency differences: supplier `rate` currency is not assumed to be PLN; never convert/expose it.
4. The only route that touches the supplier is `GET /api/admin/livepanel` (Bearer `ADMIN_API_TOKEN`), returning sanitized mapping health.

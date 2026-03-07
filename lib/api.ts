// lib/api.ts
// Legacy compatibility shim — superseded by lib/gasApi.ts
// Re-exports the new GAS API helpers so existing imports keep working.

export { fetchAllData, linkVaultItemsToTask } from '@/lib/gasApi';

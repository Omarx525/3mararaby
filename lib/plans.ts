// Monthly prices. A price of 0 disables payment submission for that method.
export const vodafoneNumber = '01033542875';
export const planPrices: Record<'plus' | 'pro', number> = { plus: 150, pro: 200 };
export const paymentsReady = (plan: 'plus' | 'pro') => vodafoneNumber.length > 5 && planPrices[plan] > 0;

// International bank transfer. Fill holder and iban once the owner sends them; USD prices are set by the owner.
export const bank = { name: 'Banque du Caire', swift: 'BCAIEGCX', holder: '', iban: '' };
export const usdPrices: Record<'plus' | 'pro', number> = { plus: 0, pro: 0 };
export const bankReady = (plan: 'plus' | 'pro') => bank.holder.length > 2 && bank.iban.length > 14 && usdPrices[plan] > 0;

// Monthly prices in EGP, confirmed by the owner. A price of 0 disables payment submission.
export const vodafoneNumber = '01033542875';
export const planPrices: Record<'plus' | 'pro', number> = { plus: 150, pro: 200 };
export const paymentsReady = (plan: 'plus' | 'pro') => vodafoneNumber.length > 5 && planPrices[plan] > 0;

import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error('MP_ACCESS_TOKEN is not defined in the environment variables');
}

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export { mercadopago, Payment, Preference };


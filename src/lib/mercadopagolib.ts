import { MercadoPagoConfig,} from 'mercadopago';


const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export { mercadopago };


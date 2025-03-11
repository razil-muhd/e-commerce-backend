import * as dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();
const env = cleanEnv(process.env, {
	ENV: str({ choices: ['local', 'production'], default: 'local' }),
	PORT: port({ default: 5050 }),
	MONGO_CONNECTION_STRING: str({
		default:
			'mongodb+srv://raazilmuhd:B9tPZsEM6Q50OzXx@cluster0.halny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
	}),
	JWT_SECRET_KEY: str({
		default:
			'eyJhbGciOiJIUzI1NiJ9.eyJSb2yhuilOQuiuyi4iLCJlfrjWbbCI6ImFkbWluQGVtYy5jb20ifQ.xCyQt3wQXRj8NojG-m26LS9GktX90VBxU15BoxLuTS8'
	}),
	ENDPOINT_SECRET: str({
		default:
			'whsec_U45Q7LjLSNfoVU8LQN8sp1a2BBPB5s3w'
	}),
	ADMIN_EMAIL: str({default:'admin@gmail.com'}),
	ADMIN_PASSWORD: str({default:'admin'}),
	JWT_EXPIRES: str({default:'7 days'}),
	USER_JWT_SECRET_KEY: str({
		default:
			'eyJhbGciOiJIUzI1NiJ9.eyJSb2yhuilOQchb syi4iLCJlfrjWbbCI6ImFkbWluQGVtYy5jb20ifQ.xCyQt3wQXRjkjhdojG-m26LS9GktX90VBxU15BoxLuTS8'
	}),
	STRIPE_SECRET_KEY: str({
		default:'sk_test_51QwHUVGgJTV4nB6vWIBR5voqjfJ5QkwTJRL1YbYADQvL3g1Sxn4eaisMVcDrHJzMR6AB5EwvAtx5WndXgSJRRDw700iPepHkb1'
	})

});
export default env;

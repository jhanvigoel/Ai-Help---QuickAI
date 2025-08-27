import {neon} from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
	throw new Error('❌ DATABASE_URL not set in environment. Cannot connect to NeonDB.');
}
const sql = neon(`${process.env.DATABASE_URL}`);

export default sql;
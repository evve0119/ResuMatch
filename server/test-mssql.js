const sql = require('mssql');

const config = {
  user: 'resumatch',
  password: '!ece1724web',
  server: 'resumatch.database.windows.net',
  database: 'resumatch',
  options: {
    encrypt: true,
    trustServerCertificate: false,
  }
};

async function test() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT 1 AS test');
    console.log('✅ Connected! Result:', result.recordset);
    sql.close();
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

test();

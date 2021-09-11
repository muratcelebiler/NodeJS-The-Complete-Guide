// Veritabanı bağlantısı için mysql2 kütüphanesini çağırıyoruz
const mysql2 = require('mysql2');

// Bağlantı için bir pool oluşturuyoruz
const pool = mysql2.createPool({
    host: 'database',
    port: '3306',
    database: 'app',
    user: 'root',
    password: 'V4pQNJYuyHeDRAbNuMUjxwqL4raCAVUE'
});

module.exports = pool.promise();
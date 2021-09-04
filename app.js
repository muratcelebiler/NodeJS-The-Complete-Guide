// Http requestlerini karşılayabilmek için bir server oluşturmamız gerekmektedir.
// Http core modulünü dahil ediyoruz.
const http = require('http');

// Express kütüphanesini dahil ediyoruz
const express = require('express');

// Express core kısmında bir fonksiyon döndüğü için core kısmını initilaize ediyoruz.
const app = express();

// Middleware ekliyoruz
app.use((req, res, next) => {
    // Console log message
    console.log("Hello, I am middleware");

    //Bu komutu eklemediğimizde bir sonraki aşamaya geçemiyoruz ve bu middleware içerisinde hapsoluyoruz.
    next();
});

// Bir server oluşturuyoruz.
const server = http.createServer(app);

// Serverımızın çalışacak portunu ayarlıyoruz.
server.listen(3000);
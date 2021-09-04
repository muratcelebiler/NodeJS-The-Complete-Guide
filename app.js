// Express kütüphanesini dahil ediyoruz
const express = require('express');

// Express core kısmında bir fonksiyon döndüğü için core kısmını initilaize ediyoruz.
const app = express();

// Middleware ekliyoruz
// Middleware sadece belli url adreslerine özel çalışabilirler.
// Örneğin aşağıdaki middleware sadece product endpointine istek atılınca çalışmaktadır.
app.use('/product', (req, res, next) => {
    // Console log message
    console.log("Hello, I am middleware only product route");

    //Bu komutu eklemediğimizde bir sonraki aşamaya geçemiyoruz ve bu middleware içerisinde hapsoluyoruz.
    next();
});

// Express de default http modülü yüklü olarak gelmektedir. 
// Biz Express içerisindeki app.listen() metodu ile aslında http.createServer() methodunu çağırıp server oluşturabiliriz.
// Detaylar için aşağıdaki url den expressjs'in github reposuna erişerek application.js dosyasındaki listen() methodunu inceleyebiliriz.
// Repo url: https://github.com/expressjs/express/blob/master/lib/application.js
app.listen(3000);
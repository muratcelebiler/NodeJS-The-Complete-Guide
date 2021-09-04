// Express kütüphanesini dahil ediyoruz
const express = require('express');

// Body parser eklentisini dahil ediyoruz. Bu eklenti ile gelen requesti parse ediyoruz
const bodyParser = require('body-parser');

// Express core kısmında bir fonksiyon döndüğü için core kısmını initilaize ediyoruz.
const app = express();

// Router'ları dahil ediyoruz
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// body-parser eklentisini tüm sistemde kullanılacak şekilde initialize ediyoruz
app.use(bodyParser.urlencoded({extended: false}));

// Router'ları initialize ediyoruz
app.use(adminRoutes);
app.use(shopRoutes);

// Express de default http modülü yüklü olarak gelmektedir. 
// Biz Express içerisindeki app.listen() metodu ile aslında http.createServer() methodunu çağırıp server oluşturabiliriz.
// Detaylar için aşağıdaki url den expressjs'in github reposuna erişerek application.js dosyasındaki listen() methodunu inceleyebiliriz.
// Repo url: https://github.com/expressjs/express/blob/master/lib/application.js
app.listen(3000);
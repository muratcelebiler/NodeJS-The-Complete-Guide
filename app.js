// Express kütüphanesini dahil ediyoruz
const express = require('express');

// Body parser eklentisini dahil ediyoruz. Bu eklenti ile gelen requesti parse ediyoruz
const bodyParser = require('body-parser');

// Express core kısmında bir fonksiyon döndüğü için core kısmını initilaize ediyoruz.
const app = express();

// body-parser eklentisini tüm sistemde kullanılacak şekilde initialize ediyoruz
app.use(bodyParser.urlencoded({extended: false}))

// add-product endpointini ekledik
app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="post"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// product endpointini ekledik
app.post('/product', (req, res, next) => {
    // Console log message
    console.log(req.body);

    //Bu komutu eklemediğimizde bir sonraki aşamaya geçemiyoruz ve bu middleware içerisinde hapsoluyoruz.
    next();
});

// Express de default http modülü yüklü olarak gelmektedir. 
// Biz Express içerisindeki app.listen() metodu ile aslında http.createServer() methodunu çağırıp server oluşturabiliriz.
// Detaylar için aşağıdaki url den expressjs'in github reposuna erişerek application.js dosyasındaki listen() methodunu inceleyebiliriz.
// Repo url: https://github.com/expressjs/express/blob/master/lib/application.js
app.listen(3000);
const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const db = require("./db");
const queries = require("./queries");

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// CORS 미들웨어 적용
app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000", // 여기서 클라이언트 주소를 서버에 허용하고 있습니다. 필요한 경우 적절한 출처 주소로 바꿔주세요.
      methods: ["GET", "POST"],
    },
  });
const PORT = process.env.PORT || 5000;

let items = [];

io.on('connection', (socket) => {
  socket.emit('setItems', items);

  socket.on("addItem", (newItem) => {
    const existingItem = items.find((item) => item.name === newItem.name);
  
    if (existingItem) {
      items = items.map((item) =>
        item.name === existingItem.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      items.push(newItem);
    }
    io.emit("setItems", items);
  });
  
  socket.on('removeItem', (name) => {
    items = items.filter((item) => item.name !== name);
    io.emit('setItems', items);
  });

  socket.on("incrementQuantity", (name, incrementAmount = 1) => {
    items = items.map((item) =>
      item.name === name ? { ...item, quantity: item.quantity + incrementAmount } : item
    );
    io.emit("setItems", items);
  });
  
  socket.on('decrementQuantity', (name) => {
    items = items.map((item) => {
      if (item.name === name && item.quantity > 0) {
        return {...item, quantity: item.quantity - 1};
      }
      return item;
    });
    io.emit('setItems', items);
  });

  ////////////////////////////////////////////////////////////////////

  app.get ('/api/products', (req, res) => {
    db.query(queries.getAllProducts, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  }
  );

  app.get('/api/brands', (req, res) => {
    db.query(queries.getAllBrand, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  }
  );

  app.get('/api/types', (req, res) => {
    db.query(queries.getAllCategory, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  }
  );
});

app.post('/api/brandsAdd', (req, res) => {
  const brandName = req.body.name;
  db.query(queries.insertBrand, brandName, (err, result) => {
    if (err) {
      console.log(err);
      } else {
        console.log(result);
        res.send(result);
        }
    });
  }
);

app.post('/api/typesAdd', (req, res) => {
  const typeName = req.body.name;
  db.query(queries.insertTypes, typeName, (err, result) => {
    if (err) {
      console.log(err);
      } else {
        console.log(result);
        res.send(result);
        }
    });
  }
);


server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const db = require("./db");
const queries = require("./queries");

const app = express();
const bodyParser = require("body-parser");
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

io.on("connection", (socket) => {
  socket.emit("setItems", items);

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

  socket.on("removeItem", (name) => {
    items = items.filter((item) => item.name !== name);
    io.emit("setItems", items);
  });

  socket.on("incrementQuantity", (name, incrementAmount = 1) => {
    items = items.map((item) =>
      item.name === name
        ? { ...item, quantity: item.quantity + incrementAmount }
        : item
    );
    io.emit("setItems", items);
  });

  socket.on("decrementQuantity", (name) => {
    items = items.map((item) => {
      if (item.name === name && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    io.emit("setItems", items);
  });

  ////////////////////////////////////////////////////////////////////

  app.get("/api/products", (req, res) => {
    db.query(queries.getAllProducts, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        res.send(result);
      }
    });
  });

  app.get("/api/brands", (req, res) => {
    db.query(queries.getAllBrand, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        res.send(result);
      }
    });
  });

  app.get("/api/types", (req, res) => {
    db.query(queries.getAllCategory, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        res.send(result);
      }
    });
  });
});

app.post("/api/inventoryAdd", (req, res) => {
  const barcode = req.body.barcode;
  const name = req.body.name;
  const brand = req.body.brand;
  const type = req.body.type;
  const quantity = req.body.quantity;
  const price = req.body.price;
  db.query(
    queries.inventoryAdd,
    [barcode, name, quantity, price, type, brand],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});



app.post("/api/brandsAdd", (req, res) => {
  const brandName = req.body.name;
  db.query(queries.insertBrand, brandName, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/api/typesAdd", (req, res) => {
  const typeName = req.body.name;
  db.query(queries.insertTypes, typeName, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/api/inventoryDelete", (req, res) => {
  const productIdx = req.body.idx;
  db.query(queries.deleteProducts, [productIdx], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/api/brandsDelete", (req, res) => {
  const brandIdx = req.body.idx;
  db.query(queries.deleteBrand, [brandIdx], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/api/typesDelete", (req, res) => {
  const typeIdx = req.body.idx;
  db.query(queries.deleteTypes, [typeIdx], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/api/inventoryUpdate", (req, res) => {
  const productIdx = req.body.idx;
  const field = req.body.field;
  const value = req.body.value;
  db.query(queries.updateProductField(productIdx, field, value), (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/api/orderSuccess", (req, res) => {
  const items = req.body;
  
  items.forEach(item => {
    const {idx, itemName, quantity, price, paymentType, amountGiven, change, brand, type} = item;

    db.query(queries.orderSuccess, [idx, itemName, quantity, price, paymentType, amountGiven, change, brand, type], (err, result) => {
      if (err) {
        console.log(err);
      } else {
          console.log(result);
      }
    });
  });
  res.send('성공적으로 저장되었습니다.');
});




server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

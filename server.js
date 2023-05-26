const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const db = require("./db");
const queries = require("./queries");

const app = express();
const bodyParser = require("body-parser");
const { el } = require("date-fns/locale");
app.use(bodyParser.json());

app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
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
    const {orderNumber, itemName, quantity, price, paymentType, amountGiven, totalPrice, change} = item;

    db.query(queries.orderSuccess, [orderNumber, itemName, quantity, price, paymentType, amountGiven, totalPrice, change], (err, result) => {
      if (err) {
        console.log(err);
      } else {
          console.log(result);

          db.query("UPDATE products SET 수량 = 수량 - ? WHERE 이름 = ?", [quantity, itemName], (err, result) => {
            if (err) {
              console.log(err);
            }
          });
      }
    });
  });
  res.status(200).send({message: '주문이 성공적으로 저장되었습니다.'});
});


app.get("/api/orderHistory", (req, res) => {
  const { day, month } = req.query;

  db.query(queries.orderHistory, [day, day, month, month], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/items/:barcode", (req, res) => {
  const barcode = req.params.barcode;

  db.query(queries.barcodeSearch, [barcode], (err, result) => {
    if (err) {
      console.error("DB query error: ", err);
      res.sendStatus(500);
      return;
    }

    if (result.length > 0) {
      const { 이름, 가격 } = result[0];
      res.send({ 이름, 가격 });
    } else {
      res.sendStatus(404);
    }
  });
});



server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

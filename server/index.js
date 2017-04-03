const express = require('express');
const r = require('rethinkdb');
const mysql = require('mysql');
const http = require('http');
const path = require('path');

// Setup socket.io instance
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Setup constants
const API_KEY = 'dff27692d4dcb2d56f13b05907e947a3';
const CUSTOMER_ID = '58a7fab81756fc834d904a8b';
const CUSTOMER_URL = 'http://api.reimaginebanking.com/customers/' + CUSTOMER_ID +
'/accounts?key=' + API_KEY;

function sendUserData(data) { // Send user data to a client
  io.on('connection', (socket) => {
    socket.emit('data_update', data);
    console.log('Data sent to user');
  });
}

function calcDailyIntake(items) {
  let totalIntake = [ // Currently only sending total intake
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < 31; j++) {
      if (items[i].n[j] === null) {
        totalIntake[j] += 0;
      } else {
        totalIntake[j] += items[i].n[j];
      }
    }
  }
  return totalIntake;
}

// Insert nutrition info into the user database
function insertFoodData(purchases, sqlConn, rConn) {
  let data = [];
  for (let i = 0; i < purchases.length; i++) {
    let item = {
      name: '',
      date: '',
      n: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
    };
    item.name = purchases[i].description;
    item.date = purchases[i].purchase_date;

    const QUERY = 'select * from nutrition where name = "' + item.name + '"';
    console.log('Query: ' + QUERY);
    sqlConn.query(QUERY, (err, results, fields) => {
      item.n[0] = results[0].n0;
      item.n[1] = results[0].n1;
      item.n[2] = results[0].n2;
      item.n[3] = results[0].n3;
      item.n[4] = results[0].n4;
      item.n[5] = results[0].n5;
      item.n[6] = results[0].n6;
      item.n[7] = results[0].n7;
      item.n[8] = results[0].n8;
      item.n[9] = results[0].n9;
      item.n[10] = results[0].n10;
      item.n[11] = results[0].n11;
      item.n[12] = results[0].n12;
      item.n[13] = results[0].n13;
      item.n[14] = results[0].n14;
      item.n[15] = results[0].n15;
      item.n[16] = results[0].n16;
      item.n[17] = results[0].n17;
      item.n[18] = results[0].n18;
      item.n[19] = results[0].n19;
      item.n[20] = results[0].n20;
      item.n[21] = results[0].n21;
      item.n[22] = results[0].n22;
      item.n[23] = results[0].n23;
      item.n[24] = results[0].n24;
      item.n[25] = results[0].n25;
      item.n[26] = results[0].n26;
      item.n[27] = results[0].n27;
      item.n[28] = results[0].n28;
      item.n[29] = results[0].n29;
      item.n[30] = results[0].n30;
      data.push(item);
      if (i === purchases.length - 1) {
        console.log('Data: ' + data);

        r.table('users').insert(data).run(rConn)
        .then((result) => {
          return r.table('users').run(rConn);
        })
        .then((cursor) => {
          return cursor.toArray();
        })
        .then((foodData) => {
          const DATA = calcDailyIntake(foodData);
          sendUserData(DATA);
        });
      }
    });
  }
}

// Get customer accounts
http.get(CUSTOMER_URL, (res) => {
  res.on('data', (acct) => {
    const ACCOUNT_ID = JSON.parse(acct.toString())[0]._id;
    // Get first account
    http.get('http://api.reimaginebanking.com/accounts/' + ACCOUNT_ID +
    '/purchases?key=' + API_KEY, (res) => {
      let buf = '';

      res.on('data', (segment) => {
        buf += segment;
      });

      res.on('end', () => {
        const PURCHASES = (JSON.parse(buf.toString()));
        // Declare RethinkDB connection in a higher scope than it's first created
        let connection;

        r.connect({ host: 'localhost', port: 28015 })
        .then((conn) => {
          connection = conn;
          return r.table('users').delete().run(connection);
        })
        .then((result) => {
          const MYSQL_CONNECTION = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'Nutriknow',
          });
          MYSQL_CONNECTION.connect();

          insertFoodData(PURCHASES, MYSQL_CONNECTION, connection);
        });
      });
    });
  });
});

app.use(express.static(path.join(__dirname, '../build')));

console.log('Web App Running!');

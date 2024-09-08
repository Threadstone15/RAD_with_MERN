const crypto = require("crypto");

const merchant_id = "1227926";
const order_id = "12345";
const payhere_amount = "100.00";
const payhere_currency = "USD";
const status_code = "2";
const merchant_secret = "MzIxNDM0NTYxNTIzMDQ1MzM5MjIyMTQzMDY3MjIyMzY5NzI0NTU4";

const md5sig = crypto
  .createHash("md5")
  .update(
    merchant_id +
      order_id +
      payhere_amount +
      payhere_currency +
      status_code +
      crypto
        .createHash("md5")
        .update(merchant_secret)
        .digest("hex")
        .toUpperCase()
  )
  .digest("hex")
  .toUpperCase();

console.log(md5sig);

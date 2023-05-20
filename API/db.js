import mysql from "mysql"

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "13112001",
    database: "blog",
    multipleStatements: true
})

db.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
    return;
  }
  console.log("Connected to MySQL database!");

  // You can perform further database operations here
  
});

export default db   
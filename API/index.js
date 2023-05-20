import express from "express"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cors from 'cors'
import db from "./db.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express();
app.use(cors({
    origin: 'http://localhost:8800/api',
    credentials: true,
})
);


app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../Client/Public/Upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//     res.json("hello this is backend")
// })

// app.get("/books", (req, res) => {
//     const q = "SELECT * FROM users"
//     db.query(q, (err, data) => {
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

// app.post("/books",(req, res) => {


// });

const port = 8800;
app.listen(port, () => {
    console.log("Connected on port " + port)
})

export default app
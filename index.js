const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')
const purchaseRoutes = require('./routes/purchase')
const path = require('path')

const app = express();

const port = process.env.PORT || 4000;

dotenv.config()

app.use(cors());
app.use(express.json());

// Connected Mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to Mongoose')
    })
    .catch((error) => {
        console.log(error);
    })

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cd) => {
        return cd(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage: storage })

app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

app.use('/v1/product', productRoutes)
app.use('/v1/user', userRoutes)
app.use('/v1/purchase', purchaseRoutes)

app.listen(port, () => {
    console.log('listening on port ' + port)
});
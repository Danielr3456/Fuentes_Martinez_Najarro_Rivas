const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors =  require('cors');

//servidor http
const app = express();

//configuraciones al servidor http
app.use(bodyParser.json());
app.use(cors());

//conexion a la bd
mongoose.connect('mongodb://localhost:27017/sistema-adopcion-gatos')
  .then(() => console.log('¡Conexión exitosa!'))
  .catch((error) => console.error('Error al conectar a la base de datos:', error)
);


//rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//configurar puerto para backend
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`);
});
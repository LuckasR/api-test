import express from 'express';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import companyRoutes from './routes/companyRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src/view'));


app.use('/api/companies', companyRoutes);
// routes
app.use('/api', userRoutes);

app.use('/admin', adminRoutes);

// 👇 route test dashboard
app.get('/admin/dashboard', (req, res) => {
  res.render('pages/dashboard');
});



// test
app.get('/', (req, res) => {
  res.send('API OK 🚀');
});

// ping (Render)
app.get('/ping', (req, res) => {
  res.send('pong');
});

export default app;
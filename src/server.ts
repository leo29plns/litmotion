import app from './App';

const PORT = process.env.PORT || 80;

app.disable('x-powered-by');
app.listen(PORT);


console.log(`litmotion is running on port ${PORT}.`);
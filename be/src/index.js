const server = require('./server');
const { PORT = 8888 } = process.env;

server.listen(PORT, () => console.log(`Number generator - backend started on ${PORT}`));
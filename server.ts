import {createServer} from 'http';
import {createReadStream} from 'fs';
import {spawn} from 'child_process';

const server = createServer((req, res) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        return createReadStream('./index.html').pipe(res);
    }

    res.setHeader('Content-Type', 'text/plain');

    const bash = spawn('bash');

    req.pipe(bash.stdin);
    bash.stdout.pipe(res);
});

server.listen(3333, () => {
    console.log('Servidor escuchando en puerto 3333...');
});

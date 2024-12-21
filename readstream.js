const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<html><head><title>Form</title></head></html>');
        res.write('<body><form method="post" action="/about"><input name="messege"/></form></body>');
        res.end();
    } else if (req.url === '/about' && req.method === 'POST') {
        // console.log(req.data);
        const body =[];
        req.on('data', (data) => {
           console.log(data.toString());

        });
        
        req.on('end', () => {
           console.log('stream finished');
           const parseBody = Buffer.concat(body).toString();
           console.log(parseBody);

        });
        
        res.write('thank you for submitting');
        res.end();

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('page not found\n');
        res.end();
    }
});

server.listen(3000);

console.log('listening on port 3000');

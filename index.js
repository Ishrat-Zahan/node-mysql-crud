const fs = require('fs');
const path = require('path');
const db = require('./db');

const http = require('http');
const server = http.createServer((req, res) => {
    // Serve static files (HTML, JS, CSS)
    if (req.method === 'GET' && req.url === '/') {
        const filePath = path.join(__dirname, 'public', 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'GET' && req.url.startsWith('/static/')) {
        const filePath = path.join(__dirname, req.url.replace('/static/', 'public/'));
        const ext = path.extname(filePath);
        const contentType = ext === '.js' ? 'application/javascript' : ext === '.css' ? 'text/css' : 'text/html';
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    } 
    // CRUD routes (as before)
    else if (req.method === 'GET' && req.url === '/users') {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    } else if (req.method === 'POST' && req.url === '/users') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { name, email, age } = JSON.parse(body);
            db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, results) => {
                if (err) throw err;
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ id: results.insertId, name, email, age }));
            });
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/users/')) {
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { name, email, age } = JSON.parse(body);
            db.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id], (err) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User updated successfully' }));
            });
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
        const id = req.url.split('/')[2];
        db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted successfully' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

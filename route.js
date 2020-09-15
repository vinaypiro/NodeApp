const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method;
    if(url=== '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>Node App</title>');
        res.write('<meta name="viewport" content="width=device-width">')
        res.write('</head><body>');
        res.write('<h1>Forms</h1><form action="/message" method="POST"><input type="text" name="message"> <button type="submit">Submit</button>Hello World! from Node js</form>');
        res.write('</body></html>');
        return res.end();
    }
    
    if(url=== '/message' && method=== 'POST') {
        const body = [];
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1]
            console.log(parseBody);
            fs.writeFileSync('message.text', message);
        })
        
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>Node App</title>');
    res.write('<meta name="viewport" content="width=device-width">')
    res.write('</head><body>');
    res.write('<h1>Hello World! from Node js</h1>');
    res.write('</body></html>');
    res.end();
}

// module.exports = { abc : requestHandler,def : 'This is the def text' }

module.exports.abc = requestHandler;
module.exports.def = 'Here we are having some text';
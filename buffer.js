const fs = require('fs');

const readStreme = fs.createReadStream(`${__dirname}/myfile.txt`);
const writeStreme = fs.createWriteStream(`${__dirname}/output.txt`);

// readStreme.on('data', (chunk) => {
//     // console.log(chunk);
//     writeStreme.write(chunk);
// });

readStreme.pipe(writeStreme);
const archiver = require("archiver");
const fs = require('fs');
const path=require('path');

let dirList=[
    'public',
    'views',
    'lib',
    'node_modules'
]

let fileList=[
    'package.json',
    'package-lock.json',
]

let output = fs.createWriteStream(path.resolve(__dirname , '../lib/VisualServer.zip'));

let archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
    console.log(Math.round(archive.pointer()/1024) + ' kbytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });
output.on('end', function() {
    console.log('Data has been drained');
  });

archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
        // log warning
        console.log(err,)
    } else {
        // throw error
        throw err;
    }    
});   
  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });
  archive.pipe(output);
  fileList.forEach(file=>  archive.file(file, { name: file }));
  dirList.forEach(dir=> archive.directory(dir+'/', dir));
 
  archive.finalize();
  
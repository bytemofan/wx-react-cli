'use strict';

var client = require('scp2');
var fs = require( 'fs' );
var vfs = require( 'vinyl-fs' );
var ftp = require( 'vinyl-ftp' );
var path = require("path");

var ftpserver = {
	port: '21', // 远程ftp服务器端口
	host: '127.0.0.1', // 远程ftp服务器地址
	username: 'qatest', // 用户名
	password: '123123', // 密码
	parallel: 10, // 并发传输数
	sftp:false // 是否启用sftp传输
}

var _HTML = {
	localPath:path.join(__dirname, '../dist/*.html'),
	remotePath: '/xxx/html/'
}

var _JS = {
	localPath:path.join(__dirname, '../dist/js/**'),
	remotePath: '/xxx/js/'
}

var _CSS = {
	localPath:path.join(__dirname, '../dist/css/**'),
	remotePath: '/xxx/css/'
}

var _IMG = {
	localPath:path.join(__dirname, '../dist/img/**/**'),
	remotePath: '/xxx/imgs/'
}

function run(options){
  var conn = ftp.create({
    host: ftpserver.host,
    port: ftpserver.port, 
    user: ftpserver.username,
    password: ftpserver.password,
    parallel: ftpserver.parallel,
  });

  var path = options.localPath;
  var remotePath = options.remotePath;

  if(ftpserver.sftp==true){
    client.scp(options.path, ftpserver.username + ':' + ftpserver.password + '@' + ftpserver.host + ':' + ftpserver.port + ':' + options.remotePath, function (err) {
      if (err) {
        console.log(err);
      } else console.log('Transfer with SFTP Completd!')
    });
  }else{
    vfs.src([path]).pipe(conn.dest(remotePath))
  }
}

run(_HTML);
run(_JS);
run(_CSS);
run(_IMG);
fx_version 'cerulean'
games { 'rdr3', 'gta5' }

author 'Conrad Osvik'
description 'A FiveM resource'
version ' 1.0.0'

client_scripts {
    'dist/client/*.js'
}

server_scripts {
    'dist/server/*.js'
}

ui_page 'dist/web/index.html'

files {
    'dist/web/index.html',
    'dist/web/main.js'
}
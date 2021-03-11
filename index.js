// require your server and launch it here
require('dotenv').config()
const server = require('./api/server');

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') { 
    const cors = require('cors')
    server.use(cors())
}

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
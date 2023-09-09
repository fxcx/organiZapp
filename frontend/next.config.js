/** @type {import('next').NextConfig} */
const nextConfig = {
    server:{
        proxy:{
            '/socket.io': {
                target: 'http://localhost:4000/',
                ws: true
            }
        }
    }
}

module.exports = nextConfig

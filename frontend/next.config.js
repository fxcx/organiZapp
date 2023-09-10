/** @type {import('next').NextConfig} */
const nextConfig = {
    server:{
        source:{
            '/socket.io': {
                destination: 'http://localhost:3000/'
            }
        }
    }
}

module.exports = nextConfig

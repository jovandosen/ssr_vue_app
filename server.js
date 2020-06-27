const createApp = require('./src/app')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
    const context = { url: req.url }
    const app = createApp(context)
    const info = {
        title: 'Vue Ssr Application',
        meta: `
            <meta name="author" content="Jovan Dosen">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        `
    }
    renderer.renderToString(app, info, (err, html) => {
        if(err){
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)
    })
})

server.listen(8080)
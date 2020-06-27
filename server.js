const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>The visited URL is: {{ url }}</div>`
    })
    const context = {
        title: 'Vue Ssr Application',
        meta: `
            <meta name="author" content="Jovan Dosen">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        `
    }
    renderer.renderToString(app, context, (err, html) => {
        if(err){
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)
    })
})

server.listen(8080)
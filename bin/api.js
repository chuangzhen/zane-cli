// bin/api.js
const https = require('https')

/** 获取用户git仓库列表信息 */
function getGitReposTemplateList(username) {
    return new Promise((resolve, reject) => {
        // 此api可以获得github用户所有的public包的相关信息，如包名等
        https.request(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'User-Agent': username
            }
        }, (res) => {
            let data = ''
            res.on('data', (chunk) => {
                data += chunk.toString()
            })
            res.on('end', () => {
                // 过滤出含-template字样的 public包信息
                const list = JSON.parse(data).filter(i => i.name.includes('-template'))
                
                resolve(list.map(item => ({ // 组合成模版所需要的name，value结构
                    name: item.name,
                    value: `https://github.com:${username}/${item.name}#main`
                })))
            })
            res.on('error', (err) => {
                reject(err)
            })
        }).end()
    })
}

module.exports = {
    getGitReposTemplateList
}

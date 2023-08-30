// 暴露项目模板列表
module.exports = [
    {
        name: 'vue3-webpack5-ts',
        // .com后接:，配合download-git-repo 包实现下载git链接到本地指定目录
        value: 'https://github.com:chuangzhen/vue3_webpack5_ts#main',
        // 下载模板成功后的引导操作 日志函数
        log: (name) => {
            console.log(`cd ${name} `)
            console.log('npm i')
            console.log('npm run dev\n')
        }
    },
    {
        // next13
        name: 'next-app-ts',
        value: 'https://github.com:chuangzhen/next-app-ts#main',
        log: (name) => {

            console.log(`cd ${name} `)
            console.log('npm i')
            console.log('npm run dev\n')
        }
    },
    {
        name: 'react18-webpack5-ts',
        value: 'https://github.com:chuangzhen/react18-webpack5-ts#main',
        log: (name) => {
            console.log(`cd ${name} `)
            console.log('npm i')
            console.log('npm run dev\n')
        }
    }
]
#! /usr/bin/env node

const commander = require('commander')
const inquirer = require('inquirer')
const downloadGitRepo = require('download-git-repo')
const path = require('path')
const ora = require('ora')
// const fs = require('fs')

// const templates = require('./templates.js')
const package = require('../package.json')
const { getGitReposTemplateList } = require('./api.js')
const { handleCoverDir, handleChangePackageName } = require('./utils')


commander.program.version(`v${package.version}`)
commander.program.on('--v', () => {
    console.log(`v${package.version}??`)
})


commander.program
    .command('create [projectName]')
    .description('创建模板')
    .option('-t,--template <templateName>', '模板名称')
    .action(async (projectName, options) => {

        const loadingTemplates = ora('正在获取模板列表...')
        loadingTemplates.start()
        const templates = await getGitReposTemplateList('chuangzhen')
        loadingTemplates.succeed('获取模板列表已完成！')

        // 使用 ：zane-cli create 具体目录名 -t 具体模板名
        // projectName templateName 命令行内没有传对应的参数或匹配不上时，会执行默认的交互逻辑
        const { templateName } = options
        let template = templates.filter((i) => i.name === templateName)[0]?.value


        if (!projectName) {
            let { name } = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: '请输入项目名称: ',
            })
            projectName = name
            // console.log('项目名称', name)
        }

        if (!template) {
            let { value } = await inquirer.prompt({
                type: 'list',
                name: 'value',
                message: "请选择项目模板",
                choices: templates
            })
            // console.log('模板：', value)
            template = value
        }



        // 目标目录的绝对路径
        const dest = path.join(process.cwd(), projectName)

        // 覆盖原目录判断逻辑
        await handleCoverDir(dest)



        const loading = ora('正在创建模板中...')
        loading.start()
        downloadGitRepo(template, dest, async (err) => {
            if (!!err) {
                loading.fail('创建模板失败', err.message)
            } else {
                await handleChangePackageName(path.join(process.cwd(), projectName, 'package.json'), projectName)
                loading.succeed('创建模板成功！')
                // 输出公共配置好的引导日志
                console.log(`cd ${projectName}`)
                console.log('npm i')
                console.log('npm run dev\n')
                console.log('具体的模板信息请查看readme')
            }
        })

    })



commander.program
    .command('getTemplates')
    .description('查询可用的模板列表')
    .action(async () => {
        const getLoading = ora('正在查找可用模板列表...')
        getLoading.start()
        const templates = await getGitReposTemplateList('chuangzhen')
        getLoading.succeed('查找完成,以下是所有可用的模板名称  \n')
        templates.forEach((element) => {
            console.log(`${element.name}\n`)
        });
    })

// process 提供了当前Node.js进程的信息，.argv 数组 表示启动node.js 的命令行参数
commander.program.parse(process.argv)

// console.log('zane-cli全局变量下对应的路径文件~~~~~~111')
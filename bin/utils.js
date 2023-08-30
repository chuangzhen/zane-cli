const inquirer = require('inquirer')
const fs = require('fs')

// 判断目标目录下是否有文件，咨询是否覆盖
const handleCoverDir = async function (dest) {
    // 目标目录下 是否已存在文件
    let isExistFile = false
    try {
        let arr = fs.readdirSync(dest)
        if (arr.length > 0) {
            isExistFile = true
        }
    } catch (err) { }
    // 目标目录已存在文件，询问用户是否覆盖原文件
    if (isExistFile) {
        const { isExist } = await inquirer.prompt({
            type: 'confirm',
            name: 'isExist',
            message: '目录已存在，是否覆盖？'
        })
        // 要覆盖的话就先删除源目录
        isExist ? fs.rmSync(dest, { recursive: true }) : process.exit(1)
    }
}

// 修改下载成功后的模板的package.json 的 name属性
const handleChangePackageName = async function name(packageJsonPath, name) {
    fs.readFile(packageJsonPath, (err, data) => {
        if (err) {
            process.exit(1)
        } else {
            const json = JSON.parse(data)
            json.name = name
            fs.writeFile(packageJsonPath, JSON.stringify(json,undefined,2), (err) => {
                if (err) {
                    throw err
                }
            })

        }
    })
}


module.exports = {
    handleCoverDir,
    handleChangePackageName
}
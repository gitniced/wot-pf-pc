const regex = /(?<=\[)(.+?)(?=\])/g;
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const failFolderDoGitPull = (packageName) => {
  let dirPath = path.resolve(__dirname);
  dirPath = `${dirPath}/${packageName.replaceAll('"', "")}`;
  dirPath = dirPath.replace(/(\r\n|\n|\r)/gm, "");
  fs.rm(dirPath, { recursive: true }, function (err) {
    if (!err) {
      doGitPull(packageName);
    } else {
      console.log(
        chalk.hex("#ff0000")(
          `${packageName}删除失败,请手动删除${packageName}并重新执行node modulePull.js`
        )
      );
    }
  });
};

const doGitPull = (packageName) => {
  require("child_process").exec(
    `git submodule update --init --force --checkout ${packageName}`,
    { encoding: "utf-8" },
    function (err, stdout, stderr) {
      if (err) {
        switch (err.code.toString()) {
          case "1":
            console.log(
              chalk.hex("#f28e4e")(
                `${packageName}仓库没有权限,或者未配置git的http令牌,请自行检查,权限获取、并且http令牌设置后,重新执行node modulePull.js`
              )
            );
            break;
          case "128":
            if (err.stack.toString().includes(".git/config: File exists")) {
              failFolderDoGitPull(packageName);
            }
            break;
          default:
            console.log("err.stack", chalk.hex("#ff0000")(err.stack));
            console.log("err.code", chalk.hex("#ff0000")(err.code));
            console.log("err.signal", chalk.hex("#ff0000")(err.signal));
        }
      } else {
        console.log(chalk.hex("#0000ff")(stdout));
      }
    }
  );
};

fs.readFile(".gitmodules", "utf8", function (err, dataStr) {
  if (err) {
    console.log(chalk.hex("#ff0000")(err));
  } else {
    let path = dataStr.match(regex);
    path = path.map((tempPath) => {
      return tempPath.replace("submodule ", "");
    });
    path.map((item) => {
      doGitPull(item);
    });
  }
});

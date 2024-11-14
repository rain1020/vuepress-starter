import path from 'path';
import fs from 'fs';

let mdDirPath = path.resolve(__dirname, '../../');
let mdArrFiles: Array<string> = [];
let titleArr: Array<string> = [];

fs.readdir(mdDirPath, (err, filesName) => {
  filesName.forEach((filePath) => {
    let reg = /.md$/;
    if (reg.test(filePath)) {
      mdArrFiles.push(filePath);
    }
  });
  mdArrFiles.forEach((fileName) => {
    let absoluteMdFilePath = path.resolve(mdDirPath, fileName);
    let rs = fs.createReadStream(absoluteMdFilePath, { encoding: 'utf-8' });
    let index;
    let pos = 0;
    let acc = '';
    rs.on('data', function (chunck) {
      index = chunck.indexOf('\n');
      acc += chunck;
      index !== -1 ? rs.close() : (pos += chunck.length);
    })
      .on('close', function () {
        titleArr.push(acc.slice(0, pos + index));
      })
      .on('error', function (err) {
        console.log('error');
      });
  });
});
let getTitle = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          text: '时间函数',
          link: '../dateFn.md',
        },
        {
          text: '带有全部的多选',
          link: '../MulSelect.md',
        },
      ]);
    }, 3000);
  });
};
export default getTitle;

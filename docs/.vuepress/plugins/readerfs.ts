import path from 'path';
import fs from 'fs';

let mdDirPath = path.resolve(__dirname, '../../../asses/icons/');
let icons = '';
let iconsArr: Array<any> = [];

let getIcons = function () {
  return {
    name: 'readericons1',
    async onPrepared(app) {
      const dirents = fs.readdirSync(mdDirPath, {
        withFileTypes: true,
      });
      for (const dirent of dirents) {
        let svg = fs
          .readFileSync(mdDirPath + '/' + dirent.name)
          .toString()
          .replace(/\n|\r\n/g, '')
          .replace(
            '<svg',
            `<symbol id="${'local'}-${dirent.name.replace('.svg', '')}"`,
          )
          .replace('</svg>', '</symbol>');
        icons += svg;
        iconsArr.push(svg);
      }
      icons = `<symbol id="myDot1" width="100px" height="100px" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="1" cy="1" r="1" /></symbol>`;
      let str = `
        let body = document.body;
        let svg = document.createElement('svg');
        svg.setAttribute('id', 'local-icon');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svg.setAttribute('style', 'position: absolute; width: 0; height: 0');
        svg.innerHTML = '<symbol id="myDot1" width="100px" height="100px" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="1" cy="1" r="1" /></symbol>';
        // let childElement = body.firstChild;
        let div = document.createElement('div');
        div.setAttribute(
          'style',
          "{ width: 100px; height:100px;background:yellow}",
        );
        body.appendChild(body)
        // body.insertBefore(div,childElement); `;
      await app.writeTemp('svg-components.ts', `export const foo1 = 1`);
    },
  };
};
export default getIcons;

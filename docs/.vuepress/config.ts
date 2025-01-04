import { defineUserConfig, defaultTheme } from 'vuepress';
import { getDirname, path, globby, fs } from '@vuepress/utils';
import getIcons from './plugins/readerfs.ts';
import path1 from 'path';
import fs1 from 'fs';

export default defineUserConfig({
  lang: 'zh-CN',
  title: '组件库',
  description: '组件库',
  plugins: [
    {
      name: 'my-plugin',
      async onPrepared(app) {
        let content = async () => {
          let componentsDir = [
            path.resolve(__dirname, '../../components'),
            path.resolve(__dirname, '../../demo'),
          ];
          const baseDirs = Array.isArray(componentsDir)
            ? componentsDir
            : [componentsDir];

          function importCode(name, absolutePath) {
            return `
              import ${name} from "${absolutePath}.vue"\n
           `;
          }
          function genImport(baseDir, file) {
            const name = file.replace(/\/|\\/g, '-');
            const absolutePath = path.resolve(baseDir, file);
            const code = importCode(name, absolutePath);
            return code;
          }
          function genImport1(baseDir, file) {
            const name = file.replace(/\/|\\/g, '-');
            const absolutePath = path.resolve(baseDir, file);
            const code = importCode1(name, absolutePath);
            return code;
          }
          function importCode1(name, absolutePath) {
            return `
            app.component("${name}", ${name});
           `;
          }
          let code = '';
          let code1 = '';
          for (const baseDir of baseDirs) {
            let files = await globby(['**/*.vue'], { cwd: baseDir });
            files = files.map((fileName) => path.basename(fileName, '.vue'));
            code +=
              files.map((file) => genImport(baseDir, file)).join('\n') + '\n';
            code1 +=
              files.map((file) => genImport1(baseDir, file)).join('\n') + '\n';
          }
          code = code + '\n';
          return `
         ${code}
            export const foo = (app)=>{
            ${code1}
          }`;
        };

        let content1 = await content();

        await app.writeTemp('global-components.ts', content1);
        // await app.writeTemp('foo.js', "export const foo = 'bar'");
      },
    },
    getIcons(),
    // {
    //   name: 'readericons',
    //   async onPrepared(app) {
    //     let mdDirPath = path1.resolve(__dirname, '../../asses/icons/');
    //     let icons = '';
    //     const dirents = fs1.readdirSync(mdDirPath, {
    //       withFileTypes: true,
    //     });

    //     for (const dirent of dirents) {
    //       let svg = fs1
    //         .readFileSync(mdDirPath + '/' + dirent.name)
    //         .toString()
    //         .replace(/\n|\r\n/g, '')
    //         .replace(
    //           '<svg',
    //           `<symbol id="${'local'}-${dirent.name.replace('.svg', '')}"`,
    //         )
    //         .replace('</svg>', '</symbol>');
    //       icons += svg;
    //     }
    //     let str = `
    //         let body = document.body;
    //         let svg = document.createElement('svg');
    //         svg.setAttribute('id', 'local-icon');
    //         svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    //         svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    //         svg.setAttribute('style', 'position: absolute; width: 0; height: 0');
    //         svg.innerHTML = '<symbol id="myDot1" width="100px" height="100px" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="1" cy="1" r="1" /></symbol>';
    //         let childElement = body.firstChild;
    //         body.insertBefore(svg,childElement); `;
    //     await app.writeTemp(
    //       'svg-components.vue',
    //       `<template><svg id="local-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${icons}</svg></template>`,
    //     );
    //   },
    // },
  ],
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
    ],
    sidebar: await (async () => {
      let mdDirPath = path.resolve(__dirname, '../');
      let sidebarDate = await fs.readdir(mdDirPath);
      let titleArr: any = [];
      sidebarDate.forEach((filePath) => {
        if (/.md$/.test(filePath)) {
          let absolutePath = path.resolve(mdDirPath, filePath);
          let rs = fs.createReadStream(absolutePath, { encoding: 'utf-8' });
          let index;
          let start;
          let pos = 0;
          let acc = '';
          rs.on('data', function (chunck) {
            start = chunck.indexOf('#');
            index = chunck.slice(start).indexOf('\n');
            acc += chunck;
            index !== -1 ? rs.close() : (pos += chunck.length);
          })
            .on('close', function () {
              titleArr.push({
                text: acc.slice(start + 2, start + index),
                link: `../${filePath}`,
              });
            })
            .on('error', function (err) {
              console.log('error');
            });
        }
      });
      return titleArr || [];
    })(),
  }),
});

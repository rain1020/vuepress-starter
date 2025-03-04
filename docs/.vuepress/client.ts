import DateFnDemo from '../../demo/DateFnDemo.vue';
import { defineClientConfig } from '@vuepress/client';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { foo } from '@temp/global-components.ts';
import { foo1 } from '@temp/svg-components.ts';

import CustomLayout from '../../components/CustomLayout.vue';
export default defineClientConfig({
  layouts: {
    CustomLayout,
  },
  enhance({ app, router }) {
    foo(app);
    app.use(ElementPlus);
    app.component('DateFnDemo', DateFnDemo);
    console.log('foo1', JSON.parse(foo1));
  },
});

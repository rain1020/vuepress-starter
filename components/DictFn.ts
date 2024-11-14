import { ref, toRefs } from 'vue';
let dictStore = {
  testDate: [
    { label: 'item1', value: '1' },
    { label: 'item2', value: '2' },
    { label: 'item3', value: '3' },
  ],
}; //缓存数据数据字典数据

export function useDict(...args) {
  let result = ref({});
  return (() => {
    args.forEach(async (type) => {
      if (dictStore[type]) {
        result.value[type] = dictStore[type];
      } else {
        //  此处调用数据词典的api接口，根据传参type，获取对应的数据库数据
        let res = await fetchList(type);
        //如果需要处理接口返回的数据，可以创建handelDate数据做一层数据映射
        dictStore[type] = result.value[type] = handelDate(res.data);
      }
    });
    return toRefs(result.value);
  })();
}
function fetchList(type) {
  /**调用数据词典的api接口 */
  /**此处也可调用项目中其他地方的列表数据的api接口 */
}
function handelDate(date) {
  /**数据处理操作 */
}

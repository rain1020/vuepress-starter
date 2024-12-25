const vScrollTo = {
  mounted(el, binding) {
    // 绑定点击事件
    el.addEventListener('click', () => {
      // 获取目标元素的 ID
      const targetId = binding.value;

      // 找到目标元素
      const targetElement = document.getElementById(targetId);
      console.log('1111', el, targetId, targetElement);
      if (targetElement) {
        // 滚动到目标元素
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  },
};

export default vScrollTo;

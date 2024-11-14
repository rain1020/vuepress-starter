let content; //存储内容
let row; //超过多少行的时候需要展开
let parent;
let btn; //展开收起按钮
let helpBox; //辅助按钮
let cont; //存储需要超出省略的内容的dom元素
let height;
let lineHeight; //行间距
let isEllipsis; //是否省略的状态
let timeoutId;
function createModel(el, content) {
  parent = document.createElement('p');
  setStyle(parent, 'overflow', 'hidden');
  setStyle(parent, 'margin', '0px');
  setStyle(parent, 'padding', '0px');
  setStyle(parent, 'border', 'none');
  setStyle(parent, 'word-break', 'break-all');
  btn = document.createElement('span');
  setStyle(btn, 'float', 'right');
  setStyle(btn, 'color', 'blue');
  setStyle(btn, 'cursor', 'pointer');
  setStyle(btn, 'clear', 'both');
  btn.addEventListener('click', clickEvent);
  helpBox = document.createElement('span');
  setStyle(helpBox, 'float', 'right');
  setStyle(helpBox, 'width', '0px');
  cont = document.createElement('span');
  cont.innerHTML = content;
  parent.appendChild(helpBox);
  parent.appendChild(btn);
  parent.appendChild(cont);
  el.innerHTML = '';
  el.appendChild(parent);
}
function clickEvent() {
  isEllipsis = !isEllipsis;
  if (isEllipsis) {
    setStyle(parent, 'height', `${row * lineHeight}px`);
    setAttr(btn, 'innerText', '...展开');
  } else {
    setStyle(parent, 'height', `${height}px`);
    setAttr(btn, 'innerText', '收起');
  }
}
function setStyle(ele, key, value) {
  ele.style[key] = value;
}
function setAttr(ele, key, value) {
  ele[key] = value;
}
function isOverRow(ele) {
  lineHeight = parseFloat(window.getComputedStyle(ele).lineHeight);
  return Math.ceil(ele.offsetHeight / lineHeight) > row;
}
const culEllipsis = (parent) => {
  if (isOverRow(cont)) {
    setStyle(parent, 'height', `auto`);
    setAttr(btn, 'innerText', '...展开');
    height = parent.offsetHeight;
    isEllipsis = true;
    setStyle(parent, 'height', `${row * lineHeight}px`);
    setStyle(helpBox, 'height', `calc(100% - ${Math.ceil(lineHeight) - 1}px)`);
  } else {
    setAttr(btn, 'innerText', '');
    setStyle(parent, 'height', `auto`);
  }
};
const vEllipsis = {
  created(el, binding) {
    content = el.innerText.trim();
    row = binding.value;
    if (!/^\d+$/.test(row)) {
      row = 1;
    }
    createModel(el, content);
  },
  mounted() {
    culEllipsis(parent);
    window.addEventListener('resize', () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        culEllipsis(parent);
      }, 50);
    });
  },
};

export default vEllipsis;

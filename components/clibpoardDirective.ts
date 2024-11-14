import ClipboardJS from 'clipboard';
let clipboard;
const vClipboard = {
  mounted: (el, binding) => {
    let act = binding.arg || 'copy';
    let target = binding.value;
    let modifiers = binding.modifiers;
    let option: any = {
      action: function (trigger) {
        if (!/^(copy|cut)$/.test(act)) {
          act = 'copy';
        }
        return act;
      },
    };
    if (modifiers.text) {
      option.text = function (target) {
        return binding.value;
      };
    } else {
      option.target = function (trigger) {
        if (target) {
          return document.querySelector(target);
        }
      };
    }
    clipboard = new ClipboardJS(el, option);
    clipboard.on('success', function (e) {
      e.clearSelection();
    });

    clipboard.on('error', function (e) {});
  },
  beforeUnmount: () => {
    clipboard.destroy();
  },
};

export default vClipboard;

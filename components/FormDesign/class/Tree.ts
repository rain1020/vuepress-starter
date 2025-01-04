import { NODE_CHECK } from 'element-plus/es/components/tree-v2/src/virtual-tree.mjs';

interface TreeNodeData {
  instanceId: string;
  groupInfo: GroupInfo;
  groupEleItem: GroupEleItem;
}
class TreeNode {
  data: TreeNodeData;
  children: TreeNode[];
  parent: TreeNode | null = null;
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  // 添加子节点
  addChild(node: TreeNode) {
    this.children.push(node);
    node.parent = this;
  }

  // 删除子节点
  removeChild(node: TreeNode) {
    this.children = this.children.filter((child) => child !== node);
    node.parent = null;
  }

  // 查找节点
  findNode(data: TreeNodeData): TreeNode | null {
    if (this.data.instanceId === data.instanceId) {
      return this;
    }
    for (let child of this.children) {
      const foundNode = child.findNode(data);
      if (foundNode) {
        return foundNode;
      }
    }
    return null;
  }
}

class Tree {
  root: TreeNode | null;
  constructor() {
    this.root = null;
  }

  // 设置根节点
  setRoot(data: TreeNodeData) {
    this.root = new TreeNode(data);
  }

  // 添加节点
  addNode(parentData: TreeNodeData, nodeData: TreeNodeData) {
    let parentNode: TreeNode | null = null;
    if (this.root === null) {
      this.root = new TreeNode(parentData);
      parentNode = this.root;
    } else {
      parentNode = this.findNode(parentData);
    }
    if (parentNode) {
      const newNode = new TreeNode(nodeData);
      parentNode.addChild(newNode);
    }
  }
  // 根据位置移动子节点
  moveChildToPosition(
    moveChildData: TreeNodeData,
    targetParentData: TreeNodeData,
    position: number,
  ): boolean {
    const moveChild = this.findNode(moveChildData);
    const targetParent = this.findNode(targetParentData);

    if (!moveChild || !targetParent) return false;

    // 从当前父节点的子节点列表中移除要移动的子节点
    if (moveChild.parent) {
      const currentIndex = moveChild.parent.children.indexOf(moveChild);
      if (currentIndex !== -1) {
        moveChild.parent.children.splice(currentIndex, 1);
      }
    }

    // 将要移动的子节点插入到目标父节点的子节点列表中的指定位置
    if (position < 0 || position > targetParent.children.length) {
      console.error('Position out of bounds');
      return false;
    }
    targetParent.children.splice(position, 0, moveChild);
    moveChild.parent = targetParent; // 更新子节点的父节点引用

    return true;
  }
  // 根据下标插入子节点
  insertChildAtIndex(
    parentData: TreeNodeData,
    nodeData: TreeNodeData,
    index: number,
  ): boolean {
    const parentNode = this.findNode(parentData);
    if (!parentNode) return false;

    // 创建新的子节点
    const newChild = new TreeNode(nodeData);

    // 检查下标是否有效
    if (index < 0 || index > parentNode.children.length) {
      console.error('Index out of bounds');
      return false;
    }

    // 在指定下标处插入新的子节点
    parentNode.children.splice(index, 0, newChild);
    newChild.parent = parentNode; // 更新新子节点的父节点引用

    return true;
  }
  // 删除节点
  removeNode(data: TreeNodeData) {
    if (this.root) {
      this._removeNode(this.root, data);
    }
  }

  // 递归删除节点
  _removeNode(node: TreeNode, data: TreeNodeData) {
    if (node.data === data) {
      node.children.forEach((child) => (child.children = []));
      return true;
    }
    for (let child of node.children) {
      if (this._removeNode(child, data)) {
        node.children = node.children.filter((n) => n.data !== data);
        return true;
      }
    }
    return false;
  }

  // 查找节点
  findNode(data: TreeNodeData): TreeNode | null {
    if (this.root) {
      return this.root.findNode(data);
    }
    return null;
  }
  // 移动节点方法
  moveNode(sourceData: TreeNodeData, targetData: TreeNodeData): boolean {
    // 查找源节点和目标节点
    const sourceNode = this.findNode(sourceData);
    const targetNode = this.findNode(targetData);

    // 如果源节点或目标节点不存在，则返回false
    if (!sourceNode || !targetNode) return false;

    // 从原父节点中移除源节点
    if (sourceNode.parent) {
      const parent = this.findNode(sourceNode.parent.data);
      if (parent) {
        parent.removeChild(sourceNode);
      }
    } else if (this.root === sourceNode) {
      // 如果源节点是根节点，需要更新根节点
      this.root = targetNode;
    }

    // 将源节点添加到目标节点的子节点中
    targetNode.addChild(sourceNode);
    return true;
  }
  getRoot() {
    return this.root;
  }
}

export { Tree, TreeNode, TreeNodeData };
export default Tree;

interface ITreeNodeData {
  key?: string | number;
  disabled?: boolean;
  locked?: boolean;
  selectable?: boolean;
  isCollection: boolean;
  draggable?: boolean;
  visible: boolean;
  children?: ITreeNodeData[];
}

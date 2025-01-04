interface GroupInfo {
  id?: string;
  name: string;
  type: string;
  groupEleItems: GroupEleItem[];
}
interface GroupEleItem {
  name: string;
  type: string;
  component: string;
}

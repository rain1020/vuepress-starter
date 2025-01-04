interface FormContainerItem {
  instanceId?: string;
  groupInfo: GroupInfo;
  groupEleItem: {
    name: string;
    type: string;
    component: string;
    children: FormContainerItem[];
  };
}

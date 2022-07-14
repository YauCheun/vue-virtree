type nodeKey = string | number; // 唯一索引

/*
 * 用户传入的source必须要有 nodeKey, name
 * */

interface TreeNodeOptions {
  nodeKey: nodeKey;
  name: string;
  level?: number; // 控制缩进
  loading?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  hasChildren?: boolean;
  children?: TreeNodeOptions[];
  parentKey?: nodeKey | null;
}

// 组件内部使用
type RequiredTreeNodeOptions = Required<TreeNodeOptions>;
type RenderFunc = (node: TreeNodeOptions) => JSX.Element;

export { nodeKey, TreeNodeOptions, RequiredTreeNodeOptions, RenderFunc };

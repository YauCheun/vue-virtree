<template>
  <div class="demo-box">
    <h3>tree demo</h3>
    <a-tree
      ref="aTree"
      :source="list"
      :render="renderNode"
      :defaultCheckedKeys="['0-0-0', '0-0-1', '0-0-2']"
      :size="27"
      :remain="8"
      show-checkbox
    >
      <template #icon="loading">
        <i v-if="loading" class="iconfont iconcustom-icon ico-loading"></i>
        <i v-else class="iconfont iconzhankai"></i>
      </template>
      <template #node="node">
        <div style="color: red">
          {{ node.name }}12312222222222222222222222222222222222
        </div>
      </template>
    </a-tree>
  </div>
</template>

<script lang="tsx">
import { defineComponent, onMounted, ref } from "vue";
import ATree from "./index";
import {
  RequiredTreeNodeOptions,
  TreeInstance,
  TreeNodeOptions,
} from "./types";
function recursion(path = "0", level = 3, h = 3): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < h; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: level > 0,
      // expanded: true,
    };
    if (level > 0) {
      treeNode.children = recursion(nodeKey, level - 1);
    }
    list.push(treeNode);
  }
  return list;
}
export default defineComponent({
  name: "TreeDemo",
  components: { ATree },
  setup(props) {
    const list = ref<TreeNodeOptions[]>([]);
    const aTree = ref<TreeInstance>();
    onMounted(() => {
      list.value = recursion();
      console.log(aTree.value?.getCheckedNodes());
    });
    const lazyLoad = (
      node: TreeNodeOptions,
      callback: (children: TreeNodeOptions[]) => void
    ) => {
      const result: TreeNodeOptions[] = [];
      for (let i = 0; i < 2; i += 1) {
        const nodeKey = `${node.nodeKey}-${i}`;
        const treeNode: TreeNodeOptions = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: true,
          // disabled: Boolean(i % 2),
        };
        result.push(treeNode);
      }
      setTimeout(() => {
        callback(result);
      }, 1000);
    };
    const renderNode = (node: TreeNodeOptions) => {
      return (
        <div style="padding: 0 4px;">
          <b style="color: red;">{node.name}</b>
        </div>
      );
    };

    return {
      list,
      lazyLoad,
      renderNode,
      aTree,
    };
  },
});
</script>

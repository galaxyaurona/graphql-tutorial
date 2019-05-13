export const Node = {
  __resolveType: (node: Object): string => {
    return node && node.constructor.name;
  },
};

export const Node = {
  __resolveType: (node: Record<string, any>): string => {
    return node && node.constructor.name;
  },
};

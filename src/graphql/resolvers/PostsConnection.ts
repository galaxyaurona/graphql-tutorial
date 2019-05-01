export const PostsConnection = {
  totalCount: async (src: any, args: any) => {
    console.log(src, args);
    return 10;
  },

  edges: async (): Promise<any[]> => {
    return [];
  },

  pageInfo: async () => {
    return {
      hasNextPage: false,
      hasPreviousPage: false,
    };
  },
};

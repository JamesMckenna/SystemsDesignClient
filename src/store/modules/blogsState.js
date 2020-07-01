const blogsState = {
  namespaced: true,

  state: {
    blogs: [],
    categories: [],
    blog: {} //TODO
  },

  getters: {
    allBlogs: state => {
      return state.blogs;
    },
    getRangeOfBlogs: state => paginationValues => {
      const ci = paginationValues.currentItem;
      const gni = paginationValues.getNumOfItems;
      const output = [];
      for (let i = ci, j = 0; j < gni; i++, j++) {
        if (state.blogs[i] !== undefined) {
          output[j] = state.blogs[i];
        }
      }
      return output;
    },
    getCategories: state => {
      return state.categories;
    },
    //This is function curring. https://javascript.info/currying-partials
    //showBlog: state => blogId => {
    //  for (let i = 0; i < state.blogs.length - 1; i++) {
    //    if (state.blogs[i].id == blogId) {
    //      return state.blogs[i];
    //    }
    //  }
    //}
    showBlog: function(state) {
      return function(blogId) {
        for (let i = 0; i < state.blogs.length - 1; i++) {
          if (state.blogs[i].id === parseInt(blogId)) {
            return state.blogs[i];
          }
        }
      };
    }
  },

  //use for sync changes to data/store
  mutations: {
    SET_BLOGS: function(state, data) {
      state.blogs = data;
    },
    SORT_BLOGS: function(state) {
      state.blogs.sort((a, b) => {
        return Date.parse(b.datePosted) - Date.parse(a.datePosted);
      });
    },
    SET_CATEGORIES: function(state, data) {
      state.categories = data;
    }
  },

  //use for async changes to data/store
  actions: {
    //This api call will have to change when backend is built.
    fetchBlogs({ commit }) {
      return fetch("/mockdata/mockBlogs.json")
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          commit("SET_BLOGS", data);
          return data;
        })
        .then(data => {
          commit("SORT_BLOGS", data);
          return data;
        })
        .catch(error => {
          console.error(error);
          return new Error(error);
        });
    },
    //This api call will have to change when backend is built.
    async fetchCategories({ commit }) {
      return await fetch("/mockdata/mockCategories.json")
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          commit("SET_CATEGORIES", data);
          return data;
        })
        .catch(error => {
          console.error(error);
          return new Error(error);
        });
    }
  }
};
export default blogsState;

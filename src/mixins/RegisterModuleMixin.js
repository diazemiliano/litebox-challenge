const DefaultOpts = {
  namespaced: true,
};

export default {
  methods: {
    registerVuexModule({ name, opts = DefaultOpts }) {
      if (!name) {
        // eslint-disable-next-line no-console
        console.warn(`Module name not provided...`);
        return;
      }

      try {
        if (!this.$store.state[name]) {
          this.$store.registerModule(name, { ...DefaultOpts, ...opts });
        } else {
          console.warn(`Module already exists in the Vuex Store`);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Can't create the Module in the Vuex Store`, e);
      }
    },
    // CHANGE:
    unRegisterVuexModule({ name }) {
      if (!name) {
        // eslint-disable-next-line no-console
        console.warn(`Module name not provided...`);
        return;
      }

      try {
        if (this.$store.state[name]) {
          this.$store.unregisterModule(name);
        } else {
          console.warn(`Module doesn't exists in the Vuex Store`);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Can't remove the Module in the Vuex Store`, e);
      }
    },
  },
};

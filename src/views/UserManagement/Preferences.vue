<template>
  <div class="preferences">
    <Layout
      :showBuilderTools="false"
      :showProjectTools="false"
      :hasPadding="true"
    >
      {{ preferences }}
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout/Layout.vue';

export default {
  name: 'Home',
  components: {
    Layout,
  },
  computed: {
    preferences() {
      let prefs = this.$store.getters.allPreferences;
      return prefs;
    },
  },
  created() {
    window.ipc.watch('preferences::update', event => {
      this.$store.dispatch('setPreferences', event);
    });
    this.$store.dispatch('sendPreferenceUpdateRequest');
  },
};
</script>

<style lang="scss" scoped>
.preferences {
  height: 100%;
}
</style>

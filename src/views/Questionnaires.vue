<template>
  <div>
    <p>{{ teamId }}</p>
    <div v-for="q in questionnaires" :key="q.id">
      {{ q.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teamId: {
      type: String
    }
  },
  data: () => ({
    questionnaires: []
  }),
  created() {
    this.$db
      .collection("teams")
      .doc(this.teamId)
      .collection("questionnaires")
      .onSnapshot(({ docs }) => {
        this.questionnaires = docs.map(d => ({
          id: d.id,
          title: d.data().title
        }));
      });
  }
};
</script>

<template>
  <div>
    <h1>
      Teams
    </h1>
    <ul>
      <li v-for="team in teams" :key="team.id">
        {{ team.name }}
      </li>
      <li>
        <a href="#" @click.prevent="createTeam">+ Create a team</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    teams: []
  }),
  methods: {
    createTeam() {
      this.$router.push("/team");
    }
  },
  created() {
    this.$db
      .collection("teams")
      .orderBy("created_at", "desc")
      .onSnapshot(snapshot => {
        this.teams = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }));
      });
  }
};
</script>

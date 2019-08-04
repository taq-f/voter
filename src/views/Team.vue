<template>
  <div>
    <p>
      <input type="text" v-model="teamName" placeholder="チーム名" />
    </p>
    <ul>
      <li v-for="member of members" :key="member">
        {{ member }}
        <button @click="remove(member)">Delete</button>
      </li>
      <li>
        <input
          type="text"
          v-model="newMemberEmail"
          placeholder="新しいメンバーのメールアドレス"
        />
        <button @click="add">Add</button>
      </li>
    </ul>
    <p>
      <button @click="createTeam" :disabled="!teamName || members.length === 0">
        Create
      </button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data: () => ({
    teamName: undefined,
    newMemberEmail: undefined,
    members: []
  }),
  methods: {
    add() {
      if (!this.newMemberEmail || this.newMemberEmail.trim() === "") {
        return;
      }
      this.members = [...this.members, this.newMemberEmail];
      this.newMemberEmail = undefined;
    },
    remove(member) {
      this.members = this.members.filter(m => m !== member);
    },
    async createTeam() {
      const teamRef = await this.$db.collection("teams").add({
        name: this.teamName,
        created_at: new Date()
      });

      const batch = this.$db.batch();
      for (const member of this.members) {
        const membersRef = teamRef.collection("members").doc();
        batch.set(membersRef, { email: member });
      }

      await batch.commit();

      this.$router.push("/teams");
    }
  }
};
</script>

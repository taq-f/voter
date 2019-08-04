import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Teams from "./views/Teams.vue";
import Team from "./views/Team.vue";
import Questionnaires from "./views/Questionnaires.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/teams",
      name: "teams",
      component: Teams
    },
    {
      path: "/team/:id?",
      name: "team",
      props: true,
      component: Team
    },
    {
      path: "/teams/:teamId/questionnaires",
      name: "questionnaires",
      props: true,
      component: Questionnaires
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

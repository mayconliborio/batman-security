import Vue from "vue";
import Router from "vue-router";
import Template from "../views/Template";
import HomePage from "../views/HomePage";
import VulnerabilityRegistration from "../views/VulnerabilityRegistration";
import UpdateVulnerability from "../views/UpdateVulnerability";
import ShowVulnerability from "../views/ShowVulnerability";

Vue.use(Router);

const routes = [
  {
    name: "Template",
    path: "/",
    redirect: { name: "HomePage" },
    component: Template,
    children: [
      {
        name: "HomePage",
        path: "/pagina-principal",
        component: HomePage,
      },
      {
        name: "VulnerabilityRegistration",
        path: "/cadastrar-vulnerabilidade",
        component: VulnerabilityRegistration,
      },
      {
        name: "UpdateVulnerability",
        path: "/editar-vulnerabilidade/:id",
        component: UpdateVulnerability,
      },
      {
        name: "ShowVulnerability",
        path: "/exibir-vulnerabilidade/:id",
        component: ShowVulnerability,
      },
    ],
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

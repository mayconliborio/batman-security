import Vue from "vue";
import Router from "vue-router";
import Template from "../views/Template";
import HomePage from "../views/HomePage";
import RegisterVulnerability from "../views/RegisterVulnerability";
import UpdateVulnerability from "../views/UpdateVulnerability";
import DeleteVulnerability from "../views/DeleteVulnerability";

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
        name: "RegisterVulnerability",
        path: "/cadastrar-vulnerabilidade",
        component: RegisterVulnerability,
      },
      {
        name: "UpdateVulnerability",
        path: "/editar-vulnerabilidade/:id",
        component: UpdateVulnerability,
      },
      {
        name: "DeleteVulnerability",
        path: "/excluir-vulnerabilidade/:id",
        component: DeleteVulnerability,
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

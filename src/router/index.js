import Vue from "vue";
import Router from "vue-router";
import Template from "../views/Template";
import ListVulnerabilities from "../views/ListVulnerabilities";
import RegisterVulnerability from "../views/RegisterVulnerability";
import UpdateVulnerability from "../views/UpdateVulnerability";
import DeleteVulnerability from "../views/DeleteVulnerability";

Vue.use(Router);

const routes = [
  {
    name: "Template",
    path: "/",
    redirect: { name: "ListVulnerabilities" },
    component: Template,
    children: [
      {
        name: "ListVulnerabilities",
        path: "/listar-vulnerabilidades",
        component: ListVulnerabilities,
      },
      {
        name: "RegisterVulnerability",
        path: "/cadastrar-vulnerabilidade",
        component: RegisterVulnerability,
      },
      {
        name: "UpdateVulnerability",
        path: "/editar-vulnerabilidade",
        component: UpdateVulnerability,
      },
      {
        name: "DeleteVulnerability",
        path: "/excluir-vulnerabilidade",
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

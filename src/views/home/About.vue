<template>
  <div class="body-container">
    <h2>About This Application</h2>
    <p>
      The current project I am working on is a blogging (this) application built
      with a VueJs client and a .NET Core backend. I will be using this
      application as a practical example of client-serve, software architecture
      - how to design and code a browser application. When this application is
      finished, I will be able to blog about software engineering using the
      Agile methodology and UML diagramming. I will upload the UML and
      documentation for this blogging application to illustrate the Software
      Development Lifecycle. As a result, the blogging side of this application
      will be open-sourced so others can see the code, or even deploy and use it
      as their own blogging platform. Links to the repo will also be included
      once the application is ready for deployment.<br /><i
        style="font-family: Roboto; font-size: .85rem;"
        >I know, just what the world needs, another blogging platform.</i
      >
    </p>
    <h3>The frameworks and libraries to be used in this application</h3>
    <ul>
      <li>
        VueJs for a browser client application - Currently running on VPS from a
        hosting provider in Eastern Europe. MS Server OS. Thunderbird Email
        Client, HmailServer, SQL Express Database.
      </li>
      <li>
        Identity Server 4 for Authoization and Authentication - Basic
        implementation finished, not yet deployed. To be deployed on an Azure
        VPS running the MS Server OS and using SQL Server for data storage.
      </li>
      <li>
        .NET Core for backend and REST API's - REST API's to be cross-platform
        and deployed on an Amazon VPS running a Linux Distro with NOSQL data
        storage technology.
      </li>
      <li>Prosemirror/Tip-tap libraries for the text editor - 60% complete</li>
      <li>
        An NPM module for basic image editing - planned, not researched yet.
      </li>
      <li>
        BabylonJs WebGL Game Engine.
      </li>
      <li>
        Plans for version 2 - VR/MR/AR/XR hardware support, Convert the VueJS
        client to a PWA, Update the backend to use Blazor, Docker Containers
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$emit("renderHeader", true);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("renderHeader", false);
    next();
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
p,
li {
  margin: 1rem auto;
  width: 45rem;
  line-height: 1.5rem;
}
.body-container {
  margin-top: 1rem;
  width: 100%;
  min-height: 80vh;
}
</style>

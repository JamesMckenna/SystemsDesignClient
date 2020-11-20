<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>I am chipping away at an enterprise type of application. Following Service Oriented Architecture, the idea is to build the base software functionality in such a way that any business can add to it and customize to suit their needs.</p> 
 
    <p> So for a base, Authentication and Authorization is must. Some sort of document creation, blog and/or text editting functionality will be needed. Where a person could can open up the a browser, log in and navigate to a page that has text editting functionality, produce some sort of written content and save as pdf or save as blog content. The application will need a public facing website as well as an administrator's client application.</p>

    <p>As of now, authentication has been implemented. The User can enable MFA using TOTP, can add and verify phone number, change password and forgot password. The User Model is a barebones IdentityUser and will need more properties at some point.</p>

    <img src="@/assets/VSSS.png" class="images"/> 

    <p>Currently, I am in the Analysis phase for the authorization use cases. Designing authorization policies, user claims and (probably) user roles - so a combination of claims and roles authorization policies. Once I have decided on the which default cliams and roles will be required for generic authorization, I can start the Design and Implementation phases. An Administrator UI / CRUD Endpoints will be required in order to taylor Authorization polices to specific business needs.</p>

    <img src="@/assets/VueSS.png" class="images"/>
    
    <p>Following the completion of authorization, comes the main client UI. As one can see, right now it is in serious need of some lovin'. Also, the document creation functionality will need to be completed as well as an API and database to accompany the main client. I am leaning towards VueJs / Net Core using a backend for front end architecture; though I like what I've seen from Blazor and may choose that route for a client framework. So I will eventually get to a unfied style across the UI's (main client, Id management, Identity Server 4 log in / log out)</p>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ["msg"],
  data() {
    return {
      error: "",
      user: undefined
    };
  },
  methods: {
    notYetImplmeneted() {
      alert("Not yet implemented");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  margin: auto auto;
  max-width: 45rem;
  text-align: left;
  text-indent: 3rem;
  padding: 1rem 1rem;
}

h2{
  margin-bottom: 3rem;
}

.images {
  width: 100%;
  max-width: 44rem;
  height: auto;
  margin: 2rem auto;
}

</style>

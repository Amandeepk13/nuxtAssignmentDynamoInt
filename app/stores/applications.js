import { defineStore } from "pinia";

export const useApplicationsStore = defineStore("applications", {
  state: () => ({
    applicationsList: [],
    search: "",
    selectedType: "All Types",
    selectedStatus: "All Status"
  }),


  getters: {
    filteredApplications(state) {
      return state.applicationsList.filter(app => {
        const matchedSearch = app.name.toLowerCase().includes(state.search.toLowerCase());
        const matchedType = state.selectedType === "All Types" || app.type.toLowerCase() === state.selectedType.toLowerCase();
        const matchedStatus = state.selectedStatus === "All Status" || app.status.toLowerCase() === state.selectedStatus.toLowerCase();

        return matchedSearch && matchedType && matchedStatus;
    });
    }
  },

  actions: {

    async fetchApplications() {
      try{
        const data = await $fetch('/api/applications');
        this.applicationsList = data;

      } catch(err){
        console.error(err);
      }
    },

    async mergeApplication(applicationName){

      try{
        await $fetch("/api/merge", {
        method: "POST",
        body: { applicationName}
      });

      await this.fetchApplications();

      } catch(err){
        console.error(err);
        throw err;
      }
    },

    async createApplication(data){
      try{
        await $fetch('/api/applications', {
        method: 'POST',
        body: data

      })
      await this.fetchApplications();
      
     } catch(err){
       console.error(err);
       throw err;
     } 
    }
  }

});

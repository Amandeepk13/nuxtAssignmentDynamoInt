/**
 * Application Store
 * 
 * Centralized store management
 * - fetch, create, manage repositories
 */

/**
 * imports
 */
import { defineStore } from "pinia";


export const useApplicationsStore = defineStore("applications", {
  /**
   * State
   */
  state: () => ({
    applicationsList: [],
    search: "",
    selectedType: "All Types",
    selectedStatus: "All Status"
  }),

  /**
   * Computed
   */
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

  /**
   * actions
   */
  actions: {

    /**
     * Fetches all repositories
     */
    async fetchApplications() {
      try{
        const data = await $fetch('/api/applications');
        this.applicationsList = data;

        return data;

      } catch(err){
        console.error(err);
        throw err;
      }
    },

    /**
     * acquires or releases token
     */
    async mergeApplication(applicationName){

      try{
        return await $fetch("/api/merge", {
          method: "POST",
          body: { applicationName}
        });

      } catch(err){
        console.error(err);
        throw err;
      }
    },

    /**
     * Creates new repository.
     */
    async createApplication(data){
      try{
        return await $fetch('/api/applications', {
          method: 'POST',
          body: data

        })
      
     } catch(err){
       console.error(err);
       throw err;
     } 
    }
  }

});

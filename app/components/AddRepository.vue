<script setup>
/**
 * AddRepository Component
 * 
 * 
 * Provide Form to admins for creating new repositories
 */


 /**
  * Composables / store
  */
const { showMsg, message, isError, showSuccess, showError, closeNotification } = useNotification()

const appStore = useApplicationsStore();

/**
 * Reactive states
 */
const repoName = ref("");
const repoType = ref("");
const repoDesc = ref("");
const repoLink = ref("");
const isCreating = ref(false); //tracks repository creation request


/**
 * Computed Properties
 */
// determines whether all fields are completed
const isFormCompleted = computed(() => {
  return repoName.value && repoType.value && repoDesc.value && repoLink.value;
});
// determines whether any field has input
const isInputPresent = computed(() => {
  return repoName.value || repoType.value || repoDesc.value || repoLink.value;
});


/**
 * Utility Functions
 */

 // clear all form fields
 const resetFields = () => {
  repoName.value = "";
  repoType.value = "";
  repoDesc.value = "";
  repoLink.value = "";
};

// create new repository
const createRepo = async () => {
  try {
    isCreating.value = true;
    isError.value = false;

    const response = await appStore.createApplication({
      name: repoName.value,
      type: repoType.value,
      description: repoDesc.value,
      repositoryLink: repoLink.value
    });

    showSuccess(response.message)
    
    resetFields();

  } catch (err) {
    
    showError(err?.data?.message)
    
  } finally{
    isCreating.value = false;
  }

  setTimeout(() => {
    showMsg.value = false;
  }, 5000);
};


</script>

<template>
  <div class="innerContainer">
    

    <div class="formCard">
      <form class="addRepoForm" @submit.prevent="createRepo">
        <div class="row g-2 mb-2">
          <div class="col-12">
            <div class="formgroup">
              <label>Repository Name</label><br />
              <input v-model="repoName" type="text" placeholder="Enter the repository name" required />
            </div>
          </div>
        </div>

      <div class="formgroupCont row g-2 mb-2">

       <div class="col-12 col-md-5">

        <div class="formgroup">
          <label>Repository Type</label><br />
          <div class="dropdown customDropdown">
            <button
              class="btn dropdown-toggle filterBtn"
              type="button"
              data-bs-toggle="dropdown"
              :style="{ color: repoType ? 'black' : 'gray'}"
            >
              {{ repoType || "Select the type" }}

              <img
                src="../assets/img/dropdown.svg"
                class="dropdownArrow"
                aria-hidden="true"
              />
            </button>

            <ul class="dropdown-menu customMenu">
              <li>
                <button type="button" class="dropdown-item" @click="repoType = 'Applications'" 
                >
                  Applications
                </button>
              </li>

              <li>
                <button type="button" class="dropdown-item" @click="repoType = 'Stacks'" >
                  Stacks
                </button>
              </li>

              <li>
                <button type="button" class="dropdown-item" @click="repoType = 'Library'" >
                  Library
                </button>
              </li>
            </ul>
          </div>
        </div>

       </div>
      
       <div class="repoLinkField col-12 col-md-7">
        <div class="formgroup">
          <label>Repository Link</label><br />
          <input v-model="repoLink" type="url" placeholder="Enter the url of repository" required/>
        </div>
        </div>

       </div>

       <div class="row g-2 mb-2">
        <div class="col-12">
           <div class="formgroup">
              <label>Repository Description</label><br />
              <textarea v-model="repoDesc" rows="5" placeholder="Short summary of this repository and purpose" required>
              </textarea>
            </div>
          </div>

        </div>

        <div class="row g-2 align-items-end mb-2">

          <div class="col-12 col-md-6">
            <div class="formgroup">
              <label>Initial Token Status</label><br />
              <input type="text" placeholder="Available" disabled />
            </div>
          </div>
           
          <div class="col-12 col-md-6">
            <div class="formActions">
              <button type="button" class="cancelBtn " @click="resetFields"
              :disabled="!isInputPresent">
              Cancel
              </button>
              <button type="submit" class="createBtn " :disabled="!isFormCompleted || isCreating" >
              {{ isCreating ? "Creating.." : "Create" }}
              </button>
          </div>

          </div>

          
        </div>
      </form>

      <div v-if="showMsg" class="alert notification d-flex justify-content-between align-items-center"
        :class="isError ? 'alert-danger' : 'alert-success'" >
        <span>{{ message }}</span>
        <button type="button" aria-label="Close Notification" class="closeBtn" @click="closeNotification">
          <img src="../assets/img/crossIcon.svg" aria-hidden="true"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.innerContainer {
  background-color: white;
  box-shadow: $box-shadow-lg;
  border-radius: $border-radius-md;
  width: 100%;
  padding: 12px 28px 28px;
  margin: 0px;
  

  h2 {
    font-size: 26px;
    margin-bottom: 2px;
  }
  p {
    font-size: $font-forDesc;
    color: gray;
  }

  .formCard {
    background-color: white;
    border-radius: $border-radius-md;
    padding: 0px 12px;
    margin: 0;

  

      .formgroup {
        display: flex;
        flex-direction: column;
        padding: 8px;

        label {
          font-size: $font-forDesc;
          margin-bottom: -6px;
        }
        input,
        textarea {
          font-size: $font-forDesc;
          background-color: $bgcolor-ofEachFields;
          border: none;
          padding: 10px 18px;
          border-radius: $border-radius-md;
          color:black;
        }
        
        .tokenField {
          display: flex;
          flex-direction: column;
        } 
        
      }

      .formActions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 0;
          flex-wrap: wrap;
          margin-left: auto;

          button {
            border: 1px solid rgba(235, 227, 227, 0.874);
            padding: 10px 14px;
            border-radius: $border-radius-pill;
            font-weight: 600;
            background-color: white;
            color: black;
            min-height: 50px;
            cursor: pointer;
            min-width:0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
          }

          button:hover {
            background-color: black;
            color: white;
          }
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
  }

.notification{
  position:absolute;
  min-width: 320px;
  right:8px;
  top: 4px;
  border-radius: $border-radius-lg;
  padding: 12px 16px;
  box-shadow: $box-shadow-notiBox;

  .closeBtn{
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    margin-left:12px;

    border: none;
    background:none;
    

    img{
      width:14px;
      height:14px;
    }
  }
}
  .customDropdown{
    max-width:250px;
  }

.filterBtn{
  width:100%;
  background-color: $bgcolor-ofEachFields;
  border:none;
  border-radius: $border-radius-md;
  padding:10px 18px;
  color: gray;
  font-size: $font-forDesc;

  display:flex;
  align-items:center;
  justify-content:space-between;

  &::after{
    display:none;
  }
  &:focus{
    outline:2px solid black;
    color: black;
  }
}

.dropdownArrow{
  width:14px;
  height:14px;
}

.customMenu{
  width:100%;
  border:none;
  border-radius: $border-radius-lg;
  padding:8px;
  box-shadow: $box-shadow-md;

  .dropdown-item{
    width:100%;
    border:none;
    background:none;
    text-align:left;
    border-radius: $border-radius-lg;
    padding:10px 14px;
    cursor:pointer;
    color: black !important;

    &:hover{
      background-color: $bgcolor-ofEachFields;
    }
    &:focus, &:active {
      color: black !important;
    }

  }
  }
}

@media (max-width: 576px) {

  .innerContainer {
    padding: 12px 16px 20px;
  }

  .formCard {
    padding: 0;
  }

  .formActions {
    justify-content: space-between;
    width: 100%;

    button {
      flex: 1;
      font-size:14px;
    }
  }
}
</style>

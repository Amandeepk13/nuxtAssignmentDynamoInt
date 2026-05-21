<script setup>
const showMsg = ref(false);
const msg = ref("");
const isError = ref(false);

const repoName = ref("");
const repoType = ref("");
const repoDesc = ref("");
const repoLink = ref("");

const isCreating = ref(false);

const appStore = useApplicationStore();

const createRepo = async () => {
  try {
    isCreating.value = true;
    isError.value = false;

    await appStore.createApplication({
      name: repoName.value,
      type: repoType.value,
      description: repoDesc.value,
      repositoryLink: repoLink.value
    });

    msg.value = `'${repoName.value}' is successfully created`;
    showMsg.value = true;

    resetFields();

  } catch (err) {
    msg.value = `'${repoName.value}' is already present`;
    isError.value = true;
    showMsg.value = true;

  } finally{
    isCreating.value = false;
  }

  setTimeout(() => {
    showMsg.value = false;
  }, 5000);
};
const resetFields = () => {
  repoName.value = "";
  repoType.value = "";
  repoDesc.value = "";
};

const isFormCompleted = computed(() => {
  return repoName.value && repoType.value && repoDesc.value && repoLink.value;
});
</script>

<template>
  <div class="innerContainer">
    <h2 tabindex="0">Add Repository</h2>
    <p tabindex="0">Create a new repository entry for token management</p>

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
                <button type="button" class="dropdown-item" @click="repoType = 'Applications'" >
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
              <input type="text" value="Available" disabled />
            </div>
          </div>
           
          <div class="col-12 col-md-6 d-flex">
            <div class="formActions d-flex flex-column flex-sm-row">
              <button type="button" class="cancelBtn " @click="resetFields">
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
        <span>{{ msg }}</span>
        <span class="closeBtn" @click="showMsg = false">
          <img src="../assets/img/crossIcon.svg" aria-hidden="true"/>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.innerContainer {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 100%;
  padding: 12px 28px 28px;
  margin: 8px;
  

  h2 {
    font-size: 26px;
    margin-bottom: 2px;
  }
  p {
    font-size: 14px;
    color: gray;
  }

  .formCard {
    background-color: white;
    border-radius: 8px;
    padding: 0px 12px;
    margin: 0;

  

      .formgroup {
        display: flex;
        flex-direction: column;
        padding: 8px;

        label {
          
          margin-bottom: -6px;
        }
        input,
        textarea {
          background-color: rgba(223, 227, 230, 0.374);
          border: none;
          padding: 10px 18px;
          color: gray;
          border-radius: 8px;
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
          flex-wrap: nowrap;
          margin-left: auto;

          button {
            border: 1px solid rgba(235, 227, 227, 0.874);
            padding: 10px 14px;
            border-radius: 20px;
            font-weight: 600;
            background-color: white;
            color: black;
            height: 50px;
            cursor: pointer;
            min-width:120px;
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

  .notification {
    position: absolute;
    top:20px;
    right:16px;
    min-width: 320px;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
  }
  .customDropdown{
  width:250px;
}

.filterBtn{
  width:100%;
  background-color:rgba(223, 227, 230, 0.374);
  border:none;
  border-radius:8px;
  padding:10px 18px;
  color:gray;

  display:flex;
  align-items:center;
  justify-content:space-between;


  &::after{
    display:none;
  }
  &:focus{
    outline:2px solid black;
  }
}

.dropdownArrow{
  width:14px;
  height:14px;
}

.customMenu{
  width:100%;
  border:none;
  border-radius:12px;
  padding:8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);

  .dropdown-item{
    width:100%;
    border:none;
    background:none;
    text-align:left;
    border-radius:8px;
    padding:10px 14px;
    cursor:pointer;

    &:hover{
      background-color: rgba(223, 227, 230, 0.5);
    }
  }
  }
}
</style>

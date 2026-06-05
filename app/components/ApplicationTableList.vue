<script setup>

const store = useApplicationsStore()
const {user} = useUserSession()

defineProps(["appsList"])

const { showMsg, message, isError, showSuccess, showError, closeNotification } = useNotification()

const handleMerge = async (applicationName) =>{
  try{
    const response = await store.mergeApplication(applicationName);

    showSuccess(response.message)

  } catch(err){

    showError(err?.data?.statusMessage)
    
  }

}

const formatDateTime = (date) => {
  if (!date) return null

  const dt = new Date(date)

  return {
    date: dt.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }),

    time: dt.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
  }
}

</script>


<template>
  <div class="tableContainer" >
  <table class="applicationTable" >

    <thead class="tableHead">
       <tr>
        <th>Repository Name</th>
        <th>Type</th>
          <th>Description</th>
          <th>Token Status</th>
          <th>Token Holder</th>
          <th>Taken At</th>
          <th>Actions</th>
          <th>Repository Link</th>
       </tr>
    </thead>

    <tbody class="tableBody">
       <tr v-for="application in appsList" :key="application.name">
        <td>{{ application.name }}</td>
        <td>
            <span class="typeBadge" :class="application.type.toLowerCase()">{{ application.type}}</span>
          </td>
        <td> {{ application.description }}</td>
        <td> <span class="statusBadge" :class="application.status.toLowerCase().replace(' ', '-')">{{ application.status }} </span>
          
        </td>
        <td> {{ application.mergedBy || '-'}}</td>

        <td> 
          <div v-if="application.mergedAt" class="dateTimeBox">
    
            <span class="dateText">
              {{ formatDateTime(application.mergedAt).date }}
            </span>

            <span class="timeText">
              {{ formatDateTime(application.mergedAt).time }}
            </span>

          </div>

          <span v-else>-</span>
        </td>

        <td><button @click="handleMerge(application.name,application)" :disabled="application.merged && application.mergedBy !== user.name"  :class="application.merged ? 'mergedBtn' : 'mergeBtn'" role="button" :aria-label= "application.merged ? 'Token is taken' : 'Click to take token'" >
          <div class="btnContent">
            <img src="../assets/img/lock.svg" aria-hidden = "true"/>
            <span>{{ application.merged ? 'Taken' : 'Take' }}</span>
          </div> </button>
        </td>

        <td>
          <div class="repoLinkColumn">

          <a :href="application.repositoryLink" target="_blank" rel="noopenor noreferrer" aria-label="Open repository">
            <img src="../assets/img/redirectLinkIcon.svg" class="repoLinkIcon" aria-hidden="true"/>

          </a>
          </div>
        </td>

        
       </tr>
    </tbody>
  </table>
  <p v-if="appsList.length === 0">No such repository is there !!!</p>
  </div>
   <div v-if="showMsg" class="alert notification d-flex justify-content-between align-items-center"
  :class="isError ? 'alert-danger' : 'alert-success'">
     <span>{{ message }}</span>
     <span class="closeBtn" @click="closeNotification"><img src="../assets/img/crossIcon.svg" aria-hidden="true" />
     </span>
   </div>

</template>


<style lang ="scss" scoped >
 
 .tableContainer{
  width:100%;
  border-radius: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  
}

.applicationTable{
  width:100%;
  min-width: 1000px;
  border-collapse: collapse;

}

.tableHead{
  
  text-align: left;
  border-bottom: 1px solid black;
}
th{
  padding: 16px;

}
td{
  padding:12px;
  border-bottom: 1px solid rgb(224, 222, 222);
}
/* tbody tr:nth-child(odd){
  background-color: rgb(211, 210, 210);
} */


.dateTimeBox{
  display:flex;
  flex-direction:column;
  gap:1px;
  color:black;
}

.dateText{
  font-size:14px;
  
}

.timeText{
  font-size:12px;
}

.mergeBtn, .mergedBtn{
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 14px;
  width: 64px;
  font-size:13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnContent{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:4px;
}

.mergeBtn{
  background-color: black;
}
.mergedBtn{
  background-color: #b6b6b6;
}

p{
  padding:12px;
}

.repoLinkColumn{
  display: flex;
  align-items: center;
  justify-content: center;
}

.repoLinkIcon {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.notification{
  position:absolute;
  min-width: 320px;
  right:8px;
  top: 4px;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);

  .closeBtn{
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    margin-left:12px;

    img{
      width:14px;
      height:14px;
    }
  }
}




.typeBadge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size:12px;
  
  &.applications {
    background-color: rgba(185, 216, 247, 0.689);
    color:rgb(4, 31, 117);
  }
  &.stacks {
    background-color: rgba(247, 189, 247, 0.728);
    color:rgb(171, 4, 171);
  }
  &.library {
    background-color: rgba(196, 247, 196, 0.735);
    color:rgb(4, 58, 12);
  }
}

.statusBadge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size:12px;

  &.available {
    background-color: black;
    color:white;
  }
  &.not-available {
    background-color: #b6b6b6;
    color:white;
  }
}




</style>
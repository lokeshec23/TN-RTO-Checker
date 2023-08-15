const inputEl = document.querySelector('input');
const formEl = document.forms.form;



async function getJSONData(){
    const response= await fetch('../js/data.json');
    return await response.json();
}


const searchRecord = async (value) => {
    
    const jsonData = await getJSONData()

    const recordFound =  jsonData.find(record =>{
    return record.code === value || value.toUpperCase().startsWith(record.code)
   });
   const resultSectionEl = document.querySelector("#resultSection");

   if(recordFound){
    // record exist 
   resultSectionEl.classList.remove('hidden');
   resultSectionEl.querySelector('#query').innerText = value.toUpperCase();
   resultSectionEl.querySelector('#rto_id').innerText = recordFound.id;
   resultSectionEl.querySelector('#rto_code').innerText = recordFound.code;
   resultSectionEl.querySelector('#rto_location').innerText = recordFound.location;
   resultSectionEl.querySelector('#rto_type').innerText = recordFound.type;
   resultSectionEl.querySelector('#rto_district').innerText = recordFound.district;
   }else{
    resultSectionEl.classList.add('hidden');
   }
};

formEl.addEventListener('submit',(event)=>{
    event.preventDefault();
    const inputValue = inputEl.value; 
    // check my validation here
    if(inputValue.length > 3){
        searchRecord(inputValue);
    }
});
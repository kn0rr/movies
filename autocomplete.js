const createAutoComplete= ({root, renderOption, onOptionSelect, inputValue, fetchData}) =>{
//we could also write this in the html file but this would be a really distinct coupleing which we doesn't want
// also it makes things much more producable if we want to have multiple dropdowns
root.innerHTML=`
    <label><b>Search</b></label>
    <input class ="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`

const input = root.querySelector('input');
const dropdown=root.querySelector('.dropdown');
const resultsWrapper=root.querySelector('.results');


// To prevent constantly doing an API call we use the set Timeout function to prevent the api call when the user is still typing
//IT is called Debouncing an input: Waiting for some time to pass after the last event to actually do something!
const onInput=async event=>{
 const items = await fetchData(event.target.value);
//if the list of searched movies is empty close the dropdown
 if(!items.length){
     dropdown.classList.remove('is-active');
     return;
 }

 //clear old results
 resultsWrapper.innerHTML='';
 //make dropdown active when doing input
 dropdown.classList.add('is-active');
 for (let item of items){
     const option = document.createElement('a');

     // add class dropdown-item to option
     option.classList.add('dropdown-item')
    option.innerHTML=renderOption(item);
    // Action when clicking on item in dropdown:
     option.addEventListener('click',()=>{
        dropdown.classList.remove('is-active');
        input.value=inputValue(item);
        onOptionSelect(item);
     });

     //add new results to resultwrapper
     resultsWrapper.appendChild(option);
 }

};

input.addEventListener('input',debounce(onInput,500) );

//if we click anywhere except for an html-element in root we want to close the dropdown
document.addEventListener('click', event=>{
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});
}
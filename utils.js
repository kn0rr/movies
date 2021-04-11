// debounce function whit default delay of one second
const debounce = (func,delay = 1000)=>{
    let timeoutId;
    // because we don't now how many arguments we want to pass we use ..args
    return (...args) =>{
        //always clear old timeout when user starts typing
        if (timeoutId){
            clearTimeout(timeoutId);
        }
        //always set new timeout when user starts typing 
        timeoutId=setTimeout(()=>{
            //to apply all arguments we use the apply function
            func.apply(null,args);
    }, delay);
    };

    };
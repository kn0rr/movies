
//beceause we need to wait for some behaviour to finish, before we can test the expected outcome

const waitFor=(selector)=>{
    return new Promise((resolve,reject)=>{
        //interval to check if "selector" appear
        const interval =setInterval(()=>{
            if (document.querySelector(selector)){
                clearInterval(interval);
                clearInterval(timeout);
                resolve();
            }
        },30);
        // If it not gets resolved within an amount of time reject the stuff
       const timeout=  setTimeout(()=>{
           clearInterval(interval);
            reject();
        },2000);
    })
}


//setup enviornment for every single test:
beforeEach(()=>{
    //clean up #target everytime
    document.querySelector('#target').innerHTML='';

    createAutoComplete({
        //Target is the "Website" where we want to run autocomplete function
        root:document.querySelector('#target'),
        //Fake Data:
    fetchData(){
        return [
            {Title:'Avengers'},
            {Title:'Not Avengers'},
            {Title:'Some other Avengers'}
            ]
        },
        renderOption(movie){
            return movie.Title;
        }
    });
});

it('Dropdown starts closed',()=>{
    const dropdown=document.querySelector('.dropdown');

    expect(dropdown.className).not.to.include('is-active');
});


it('After searching, dropdown opens up',async()=>{
    const input=document.querySelector('input');
    input.value='test';
    const dropdown=document.querySelector('.dropdown');
    input.dispatchEvent(new Event('input'));
    await waitFor('.dropdown-item');
    expect(dropdown.className).to.include('is-active');
});

it('After searching, displays some results',async()=>{
    const input=document.querySelector('input');
    input.value='test';
    input.dispatchEvent(new Event('input'));
    await waitFor('.dropdown-item');
    const items=document.querySelectorAll('.dropdown-item');

    expect(items.length).to.equal(3);
    expect(items.length).to.not.equal(4);
})
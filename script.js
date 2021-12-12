var url="https://api.openbrewerydb.org/breweries"

const container=document.createElement("div");
container.setAttribute('class','container');

const title=document.createElement("h1");
title.setAttribute('class','title text-center');
title.innerHTML="Breweries";
document.body.appendChild(title);

const row=document.createElement('div');
row.setAttribute('class','row justify-content-center');
container.appendChild(row);

//Changing the first letter of brewery type to upper case
function toUppercase(type){
     return type[0].toUpperCase()+type.substring(1);
}

//To display the data received from Brewery API
function display(response)
{
    console.log(response);
    
    
    response.forEach((data)=>{
        const name = data.name;
        const type = toUppercase(String(data.brewery_type));
        const street = data.street === null || data.street === 'Unnamed Street'? '':data.street;
        const city = data.city;
        const state = data.state === null? data.address_2:data.state;
        const country = data.country;
        const postal = data.postal_code;
        const website = data.website_url === null? '': `<span class="blue">Website:</span> <a href="${data.website_url}">${data.website_url}</a>`;
        const phone = data.phone === null? '': '<i class="fa fa-phone" aria-hidden="true"></i> '+data.phone;
        
        const div=`<div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 card breweries">
        <div class="card-title text-center">${name}</div>
        <div class="card-text">
        <div class="brewerytype"><span class="blue">Type:</span> ${type}</div><br>
        <div class="address">
        <div><i class="fa fa-map-marker" aria-hidden="true"></i> ${street}</div>
        <div>${city}</div>
        <div>${state} - ${postal}</div>
        <div>${country}</div>
        </div><br>
        <div class="phone">${phone}</div></div><br>
        <div class="website"> ${website}</div></div>`
        row.innerHTML+=div;
    })
    document.body.append(container);
}

//To retrieve the data from the Brewery API
async function getData(){

    try {
        const res = await fetch(url);
        const data = await res.json();
        display(data);
    } catch (error) {
        console.log(error);
    }
}

getData();

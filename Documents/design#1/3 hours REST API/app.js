function uploadCloud(){
    
    
    const vegname=veg.value;
    const cost=price.value;
    const quantity=kg.value;
    
    
    const invDetails={
      name:vegname,
      price:cost,
      kg:quantity
      }
      
      axios.post("https://crudcrud.com/api/85c3be7b4cdf43a78d0bf06d9334e347/inventory",invDetails).then((res)=>displayData(res.data)).catch((err)=>{
          console.log(err);
          })
          veg.value="";
          price.value="";
          kg.value='';
          }
          window.addEventListener("DOMContentLoaded",()=>{    
             // axios.delete(`https://crudcrud.com/api/371faac3f6684d0fbaf6335db5346d44/inventory/666bd4aa19f3e403e81e307f`).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
              axios.get("https://crudcrud.com/api/85c3be7b4cdf43a78d0bf06d9334e347/inventory").then((res)=> {for(let i=0;i<res.data.length;i++){
                displayData(res.data[i]);
                }}).catch((err)=>{console.log(err)})  })    
             
                  function displayData(invDetails){
                      const invItem =document.createElement('li');
                      invItem.id=invDetails._id;
                      invItem.innerHTML=`${invDetails.name}-${invDetails.price}-${invDetails.kg}Kg`;
                      
                      const invList=document.querySelector("ul");
                      invList.appendChild(invItem);
                   //   invList.appendChild(invItem);
                      const buyQuan=document.createElement("input");
                      buyQuan.type="number";
                      invItem.appendChild(buyQuan);
                      const delBtn=document.createElement("button");
                      delBtn.innerText='delete';
                      invItem.appendChild(delBtn);
                      const buyBtn=document.createElement("button");
                      buyBtn.innerText='Buy';
                      invItem.appendChild(buyBtn)
                     delBtn.addEventListener('click',(event)=>{
                      const delId=event.target.parentNode.id;
                      invList.removeChild(event.target.parentElement);
                      axios.delete(`https://crudcrud.com/api/85c3be7b4cdf43a78d0bf06d9334e347/inventory/${delId}`).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
                    })
                    buyBtn.addEventListener(('click'),(event)=>{
                        const edId=event.target.parentNode.id;
                        const bought=buyQuan.value
                        const url=`https://crudcrud.com/api/85c3be7b4cdf43a78d0bf06d9334e347/inventory/${edId}`;
                        axios.get(url).then((res)=> {const update=res.data.kg-bought;
                            const obj={
                                name:res.data.name,
                                price:res.data.price,
                                kg:update
                            }
                            console.log(obj);
                            axios.put(url,obj).then((resolve)=>{window.location.reload();
                                console.log(resolve);
                            }).catch((error)=>console.log(error));
                    }).catch((err)=>console.log(err))
                    })}

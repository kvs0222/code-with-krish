
function getMinNumber(num1,num2){
    if(isNaN(num1) || isNaN(num2)){
        return {
            status: 400,
            data:{
                error: "Please enter the valid number for comparison "
            },
        };
    }else{
      return  {
            status: 200,
            data:{min: Math.min(num1,num2)},
        };
    }
    
}

function getMaxNumber(num1,num2){
    if(isNaN(num1) || isNaN(num2)){
        return {
            status: 400,
            data:{
                error: "Both number should be valid number "
            },
        };
    }else{
      return  {
            status: 200,
            data:{max: num1>num2?num1:num2},
        };
    }
    
}
function getAvarageNumber(numbers){
    if(!numbers){
        return {
            status: 400,
            data:{
                error: "Enter the number for calculate avarage "
            },
        };
    }
    const inputs = numbers.split(',');
    let sum = 0;
    for(let i = 0;i < inputs.length; i++){
        sum+=inputs[i];
    }

      return  {
            status: 200,
            data:{avarage: sum/inputs.length},
        };
    
}

function getSortedNumbers(queryParam,type){

    const numbers =  queryParam.split(',').map(Number);

    for(let i=0;i<numbers.length;i++){
        for(let l=i+1;l<numbers.length;l++){
            if(isNaN(numbers[i]) || isNaN(numbers[l])){
                return {
                    status: 400,
                    data:{
                        error: "Inputs accept only numbers "
                    },
                };
            }
            if(numbers[i]>numbers[l] && type.toLowerCase()=='asc'){
                numbers[i]=numbers[i]+numbers[l];
                numbers[l]=numbers[i]-numbers[l];
                numbers[i]=numbers[i]-numbers[l];
            }else if(numbers[i]<numbers[l] && type.toLowerCase()=='dec'){
                numbers[i]=numbers[i]+numbers[l];
                numbers[l]=numbers[i]-numbers[l];
                numbers[i]=numbers[i]-numbers[l];
            }
        }
    }

    return  {
        status: 200,
        data:{sorted_array: numbers},
    };
    
}

function getRepititionCount(alphanumaricsString,searchString){

    if(!alphanumaricsString || !searchString){
        return {
            status: 400,
            data:{
                error: 'Both alphanumaricsString and searchString required'
            }
        }
    }
    const countRepetitions = (alphanumaricsString,searchString)=>{
        const alphanumarics = alphanumaricsString.split(',');
        let count = 0;
        for(const alphanumaric of alphanumarics){
            if(alphanumaric === searchString){
                count++;
            }
        }
        return {
            status: 200,
            data: {
                search: searchString,
                count: count
            }
        }
        
    }

}
module.exports={getMinNumber,getMaxNumber,getAvarageNumber,getSortedNumbers,getRepititionCount};

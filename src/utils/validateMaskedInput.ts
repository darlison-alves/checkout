export const validateMaskedInput = (value:string) =>{
    if(value.includes('_')){
      return false
    }else{
      return true
    }
}

export const validateEmailInput = (value: string) => {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (value.match(pattern)) {
    return true;
  } else {
    return false;
  }
};
export const validateMaskedInput = (value:string) =>{
    if(value.includes('_')){
      return false
    }else{
      return true
    }
}
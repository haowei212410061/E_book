export function useCheckVaild() {
  const checkPasswordLength = (password) => {
    return password.length >= 8
  };
  const checkPasswordValid = (password) => {
    const hasNumber = /[0-9]/.test(password);
    const hasUpperChar = /[a-z]/.test(password);
    const hasLowerChar = /[A-Z]/.test(password);
    return hasNumber && hasUpperChar && hasLowerChar;
  };
  const checkEmpty = (value) => {
    return value.length === 0;
  };

  const checkDuplicate = (array,value) =>{
    return array.some((item)=>item.email === value)
  }
  const checkDate = (start,end) =>{
    const startDate = start.split("-").map((item)=>{return Number(item)}).reduce((val,add)=>val+add)
    const endDate = end.split("-").map((item)=>{return Number(item)}).reduce((val,add)=>val+add)
    return endDate > startDate
  }

  return {
    checkPasswordLength,
    checkPasswordValid,
    checkEmpty,
    checkDuplicate,
    checkDate
  }
}

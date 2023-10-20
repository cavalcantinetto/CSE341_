export function convertDate(data) {
    try {
      let formattedDate = data.slice(0,10)
      return formattedDate;
    } catch {
      return null
    }
    
      
  }
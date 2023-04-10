export function convertDate(data) {
    // var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
    // const yyyy = date.getFullYear();
    // let mm = date.getMonth() + 1; // Months start at 0!
    // let dd = date.getDate();
    // if (dd < 10) dd = '0' + dd;
    // if (mm < 10) mm = '0' + mm;
    // const formattedDate = mm + '/' + dd + '/' + yyyy;

    let formattedDate = data.slice(0,10)
    return formattedDate;
      
  }
export const dateToString = (date) => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

export const getClipboardContents = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        console.log(clipboardItem)
        // for (const type of clipboardItem.types) {
        //   const blob = await clipboardItem.getType(type);
        //   console.log(URL.createObjectURL(blob));
        // }
      }
    } catch (err) {
      console.error(err.name, err.message);
    }
  }

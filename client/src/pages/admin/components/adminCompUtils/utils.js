export const changeCategory = (e, categories, setAttributes, setCategoryChoosen) => {
  console.log(e.target.value)
  const highLevelCat = e.target.value.split("/")[0];
  const catzData = categories.find(c => c.name === highLevelCat)

  if (catzData && catzData.attrs) {
    setAttributes(catzData.attrs)
  } else {
    setAttributes([])
  }
  setCategoryChoosen(e.target.value)
}

export const handleAttribute = (e, attributes, attrVal) => {
  if (e.target.value !== "Choose attribute") {
    let selectedAttr = attributes.find(a => a.key === e.target.value);
    // console.log(selectedAttr)
    if (selectedAttr && selectedAttr.value.length > 0) {
      while (attrVal.current.options.length) {
        // 
        attrVal.current.remove(0)
      }
      attrVal.current.options.add(new Option("Choose attribute value"));
      selectedAttr.value.forEach(v => {
        attrVal.current.add(new Option(v))
      })
    }
  }
}

export const tableWrapper = (key, val, setTable) => {
  // console.log(key, val)
  setTable((prev) => {
    // console.log(prev)
    if (prev.length !== 0) {
      var keyExistedInOldTable = false;
      let modifiedTable = prev.map(item => {
        if (item.key === key) {
          keyExistedInOldTable = true;
          item.value = val;
          return item
        } else {
          return item
        }
      })
      if (keyExistedInOldTable) {
        return [...modifiedTable];
      } else {
        return [...modifiedTable, { key, value: val }]
      }
    } else {
      return [{ key, value: val }];
    }
  })
}



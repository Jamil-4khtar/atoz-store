const imageValidate = (images) => {
  let imageTable = []
  if(Array.isArray(images)) {
    imageTable = images
  } else {
    imageTable.push(images)
  }

  if(imageTable.length > 3) {
    return { error: "Send no more than 3 images at once"}
  }

  for(let image of imageTable) {
    if(image.size > 1048576) return { error : "Size is too large (above 1 MB)"}

    const filetypes = /jpg|jpeg|png/
    const mimetype = filetypes.test(image.mimetype)

    if(!mimetype) return { error: "Incorrect mime type (should be jpg, jpeg or png)" }
  }
  return { error: false }
}

module.exports = imageValidate
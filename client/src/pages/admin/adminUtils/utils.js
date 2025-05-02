import axios from 'axios'


export const uploadImagesApi = async (images, productId) => {
  const formData = new FormData();
  Array.from(images).forEach(image => {
    formData.append("images", image)
  })
  const { data } = await axios.post("/api/products/admin/upload?productId=" + productId, formData);
  return data
}

export const uploadImagesCloudinaryApi = (images, productId) => {
  const url = "https://api.cloudinary.com/v1_1/drnhu1xys/image/upload";
  
  for (let i = 0; i < images.length; i++) {
    const formData = new FormData();
    formData.append("file", images[i]);
    formData.append("upload_preset", "first_jamil_upload");

    fetch(url, {
      method: "POST",
      body: formData
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data)
      axios.post("/api/products/admin/upload?cloudinary=true&productId="+productId, data)
    })
  }
}


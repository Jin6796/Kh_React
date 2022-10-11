class PictureUpload {
  async upload(file) {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "hxfacvcw")
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/ddwzbuzyt/upload",
      {
        method: "POST",
        body: data,
      }
    )
    return await result.json()
  }
}
export default PictureUpload
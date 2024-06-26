export default async function(path) {
  try {
    const resp = await fetch('/api/view', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'url': path})
    })
  }
  catch(error) {
    console.log(error)
  }
}
const fetchGet = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      return json
    } else {
      throw new Error('Server error')
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default fetchGet

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch model: ${response.statusText}`);
    }

    const models = await response.json();
    return models;
  } catch (error) {
    console.error("Error fetching model data:", error);
    return null;
  }
}

export default fetchModel;

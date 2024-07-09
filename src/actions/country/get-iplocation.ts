export const getIpLocation = async (ip: string): Promise<string> => {
  const { IP_GEOLOCATION_API_KEY } = process.env;
  try {
    const response = await fetch(`${IP_GEOLOCATION_API_KEY}&ip=${ip}`);
    const data = await response.json();
    return data.country_name;
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
    throw new Error("No se pudo determinar la ubicación");
  }
};

export const fetchBusinesses = async (query: string) => {
  const res = await fetch(`/api/businesses/search?query=${query}`);
  if (!res.ok) throw new Error("Error fetching businesses");
  return res.json();
};

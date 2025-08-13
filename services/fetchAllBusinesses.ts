import { Business } from "@/types/businessType";

export const fetchAllBusinesses = async ({
  pageParam = 0,
}): Promise<{ data: Business[]; nextPage: number | null }> => {
  const pageSize = 20;

  const allBusinesses: Business[] = Array.from({ length: 130 }).map((_, i) => ({
    id: (i + 1).toString(),
    name: `خدمت شماره ${i + 1}`,
    description: `توضیحات خدمت شماره ${i + 1}`,
    image_url: `https://picsum.photos/seed/${i + 1}/100/100`,
    category: { name: `دسته ${(i % 5) + 1}` },
    owner: { full_name: `صاحب کسب‌وکار ${(i % 10) + 1}` },
  }));

  const start = pageParam * pageSize;
  const end = start + pageSize;
  const pageData = allBusinesses.slice(start, end);
  const nextPage = end < allBusinesses.length ? pageParam + 1 : null;

  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: pageData, nextPage }), 500)
  );
};

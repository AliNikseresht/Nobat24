import { supabase } from "@/libs/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  const { data, error } = await supabase
    .from("businesses")
    .select(`
      id,
      name,
      description,
      image_url,
      category:categories(name),
      owner:profiles(full_name)
    `)
    .ilike("name", `%${query}%`)
    .or(`category.name.ilike.%${query}%,owner.full_name.ilike.%${query}%`);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

'use server'
import { createClient } from "@/prismicio";

const prismicClient = createClient();

export const fetchPrismicSingleDocument = async (page = "home") => {
    const data = await prismicClient.getSingle(page);

    if(!data) throw new Error("Could not fetch document");

    return data;
}

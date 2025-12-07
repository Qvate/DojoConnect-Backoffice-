import { eq, InferSelectModel } from "drizzle-orm";
import { getDB } from "../db";
import { dojos } from "../db/schema";

export type IDojo = InferSelectModel<typeof dojos>;

export const fetchDojoBySlug = async (slug: string): Promise<IDojo | null> => {
  try {
    const dojo = await getDB().query.dojos.findFirst({
      where: eq(dojos.dojoTag, slug),
    });

    if (!dojo) {
      return null;
    }

    return dojo;
  } catch (err: any) {
    console.error(`Error fetching dojo by slug: ${slug}`, { err });
    throw new Error(err);
  }
};

export const fetchDojoByID = async (dojoId: number): Promise<IDojo | null> => {
  try {
    const dojo = await getDB().query.dojos.findFirst({
      where: eq(dojos.id, dojoId),
    });

    if (!dojo) {
      return null;
    }

    return dojo;
  } catch (err: any) {
    console.error(`Error fetching dojo by ID: ${dojoId}`, { err });
    throw new Error(err);
  }
};

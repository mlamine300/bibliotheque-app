import ImageKit from "imagekit";
import seedData from "../../seedData.json";

import { bookTable } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLICKEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY!,
});
const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.error("Error seeding data", error);
  }
};
const seed = async () => {
  console.log("seeding data.....");
  let i = 0;
  for (const book of seedData) {
    console.log("seeding ", book.id, " : " + i++);
    const coverUrl = (await uploadToImageKit(
      book.cover,
      `${book.title}.jpg`,
      "/books/img"
    )) as string;

    const videoUrl = (await uploadToImageKit(
      book.video,
      `${book.title}.mp4`,
      "/books/videos"
    )) as string;

    await db
      .insert(bookTable)
      .values({ ...book, id: undefined, cover: coverUrl, video: videoUrl });
    try {
    } catch (error) {
      console.error("Error seeding data", error);
    }
  }
};

seed();

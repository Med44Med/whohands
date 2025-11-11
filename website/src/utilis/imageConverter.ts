import { fromBlob } from "image-resize-compress";
export default async function imageConverter(
  image: File,
  width: number | string
): Promise<Blob> {

  const quality = 80; // For webp and jpeg formats
  const height = "auto"; // Original height
  const format = "webp"; // Output format

  const resizedBlob = await fromBlob(image, quality, width, height, format);
    return resizedBlob;
//   const url = await blobToURL(resizedBlob);
}

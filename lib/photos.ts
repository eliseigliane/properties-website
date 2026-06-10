const CLOUD_NAME = "dxur5yo2i";

export function photoUrl(propertyId: string, filename: string): string {
  const encoded = encodeURIComponent(filename);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/photos/${propertyId}/${encoded}`;
}

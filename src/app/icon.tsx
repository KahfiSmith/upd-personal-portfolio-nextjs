import { ImageResponse } from "next/og";
import { SiteIcon } from "@/components/common/SiteIcon";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<SiteIcon size={size.width} />, size);
}

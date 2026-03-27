import { ImageResponse } from "next/og";
import { SiteIcon } from "@/components/common/SiteIcon";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<SiteIcon size={size.width} />, size);
}

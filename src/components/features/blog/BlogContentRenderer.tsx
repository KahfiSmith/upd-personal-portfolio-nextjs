import Image from "next/image";
import { BlogContentText, BlogContentImage } from "@/types";

interface BlogContentRendererProps {
  content: (BlogContentText | BlogContentImage)[];
  postSlug: string;
}

const paragraphClasses =
  "text-lg md:text-xl leading-relaxed md:leading-relaxed text-charcoal/90 text-justify";

export function BlogContentRenderer({
  content,
  postSlug,
}: BlogContentRendererProps) {
  const renderContentGroup = (
    items: (BlogContentText | BlogContentImage)[],
    startIdx: number
  ) => {
    if (
      items.length >= 2 &&
      items[0].type === "image" &&
      items[1].type === "text"
    ) {
      const imageItem = items[0] as BlogContentImage;
      const textItem = items[1] as BlogContentText;

      const isImageLeft = startIdx % 2 === 0;

      return (
        <div
          key={`${postSlug}-group-${startIdx}`}
          className="my-8 md:my-10 overflow-hidden"
        >
          <div
            className={
              isImageLeft
                ? "float-left w-1/3 lg:w-2/5 mr-6 md:mr-8 mb-4"
                : "float-right w-1/3 lg:w-2/5 ml-6 md:ml-8 mb-4"
            }
          >
            <div className="w-full">
              <Image
                src={imageItem.src}
                alt={imageItem.alt}
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-auto rounded-lg object-contain shadow-sm"
                priority={startIdx === 0}
              />
            </div>
          </div>

          <div className="prose max-w-none space-y-4 md:space-y-5">
            <p className={paragraphClasses}>{textItem.content}</p>
            {items.slice(2).map((item, idx) =>
              item.type === "text" ? (
                <p
                  key={`${postSlug}-additional-text-${startIdx}-${idx}`}
                  className={paragraphClasses}
                >
                  {item.content}
                </p>
              ) : null
            )}
          </div>

          <div className="clear-both" />
        </div>
      );
    }

    return items.map((item, idx) => {
      const actualIdx = startIdx + idx;

      if (item.type === "text") {
        return (
          <p
            key={`${postSlug}-text-${actualIdx}`}
            className={`${paragraphClasses} mb-6 md:mb-8 last:mb-0`}
          >
            {item.content}
          </p>
        );
      } else if (item.type === "image") {
        return (
          <figure
            key={`${postSlug}-image-${actualIdx}`}
            className="my-8 md:my-10"
          >
            <div className="overflow-hidden rounded-lg shadow-sm border border-charcoal/5">
              <Image
                src={item.src}
                alt={item.alt}
                width={1400}
                height={900}
                sizes="100vw"
                className="w-full h-auto object-contain"
                priority={actualIdx === 0}
              />
            </div>
          </figure>
        );
      }
      return null;
    });
  };

  const groupedContent = [];
  let currentGroup = [];
  let i = 0;

  while (i < content.length) {
    const currentItem = content[i];
    const nextItem = content[i + 1];
    if (currentItem.type === "image" && nextItem?.type === "text") {
      currentGroup = [currentItem, nextItem];
      let j = i + 2;
      while (j < content.length && content[j].type === "text") {
        currentGroup.push(content[j]);
        j++;
      }
      groupedContent.push({ items: currentGroup, startIdx: i });
      i = j;
      currentGroup = [];
    } else {
      groupedContent.push({ items: [currentItem], startIdx: i });
      i++;
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      {groupedContent.map(({ items, startIdx }) =>
        renderContentGroup(items, startIdx)
      )}
    </div>
  );
}

"use client";

import SidebarGlobal from "@/components/SidebarGlobal";
import Workspace from "@/components/Workspace";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { chapters, LevelConfig } from "@/lib/levels";

export default function Page() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialLevelIndex = parseInt(searchParams.get("level") || "0");

  const chapter = chapters[slug];
  const initialLevelConfig = chapter?.levels[initialLevelIndex] || null;

  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(initialLevelIndex);
  const [currentLevelConfig, setCurrentLevelConfig] =
    useState<LevelConfig | null>(initialLevelConfig);

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.name);
      setDescr(`Level ${currentLevelIndex + 1} of ${chapter.name}`);

      // Update currentLevelConfig if chapter or level index changes
      if (chapter.levels[currentLevelIndex]) {
        setCurrentLevelConfig(chapter.levels[currentLevelIndex]);
      } else {
        // Handle invalid level index, maybe redirect to first level or error page
        router.push(`/chapters/${slug}?level=0`);
      }
    } else {
      // Handle invalid chapter slug, maybe redirect to home or 404
      router.push("/");
    }
  }, [slug, currentLevelIndex, chapter, router]);

  const handleLevelComplete = () => {
    setTimeout(() => {
      if (!chapter) return;

      if (currentLevelIndex < chapter.levels.length - 1) {
        // Advance to the next level in the current chapter
        const nextLevelIndex = currentLevelIndex + 1;
        setCurrentLevelIndex(nextLevelIndex);
        router.push(`/chapters/${slug}?level=${nextLevelIndex}`);
      } else {
        // Current chapter completed, advance to the next chapter
        const chapterSlugs = Object.keys(chapters);
        const currentChapterIndex = chapterSlugs.indexOf(slug);

        if (currentChapterIndex < chapterSlugs.length - 1) {
          const nextChapterSlug = chapterSlugs[currentChapterIndex + 1];
          setCurrentLevelIndex(0); // Reset level index for the new chapter
          router.push(`/chapters/${nextChapterSlug}?level=0`);
        } else {
          // All chapters and levels completed
          alert("Congratulations! You have completed all chapters and levels!");
          router.push("/"); // Redirect to home or a completion page
        }
      }
    }, 500); // 500ms delay
  };

  if (!currentLevelConfig) {
    return <div>Loading level...</div>;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div>
        <SidebarGlobal />
      </div>
      <div className="flex-1  flex flex-col">
        <Workspace
          levelConfig={currentLevelConfig}
          onLevelComplete={handleLevelComplete}
        />
        <div className="p-4 border-t">
          <h1 className="font-bold">{title}</h1>
          <p>Welcome traveler! {descr}.</p>
        </div>
      </div>
    </div>
  );
}

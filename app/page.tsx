import Link from "next/link";

import { DrawingDesignEngineerTypography } from "~/components/drawing-de-typography";
import { AboutTypography } from "~/components/icons/about-typography";
import { ArrowRight } from "~/components/icons/arrow-right";
import { ArrowUpRight } from "~/components/icons/arrow-up-right";
import { InspirationTypography } from "~/components/icons/inspiration-typography";
import { WorkExpTypography } from "~/components/icons/work-exp-typography";
import { Button } from "~/components/ui/button";
import {
  DialogToDrawer,
  DialogToDrawerContent,
  DialogToDrawerDescription,
  DialogToDrawerHeader,
  DialogToDrawerTitle,
  DialogToDrawerTrigger,
} from "~/components/ui/dialog-to-drawer";
import { ScrollArea } from "~/components/ui/scroll-area";
import { inspiration } from "~/content/inspiration";
import { workExperience } from "~/content/work-exp";

export default function Page() {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-baseline gap-1 sm:mb-0">
        <h1 className="text-xl font-bold">oleksandr kovaliuk</h1>

        <p className="text-foreground text-md relative isolate font-bold">
          senior front-end engineer
          <span className="text-foreground absolute inset-0 top-0 -z-1">
            <DrawingDesignEngineerTypography className="-mb-9 h-7.5" />
          </span>
        </p>
      </div>

      <p className="text-muted-foreground mb-12 text-sm sm:mb-20">
        Be curious. Read widely. Try new things
      </p>

      <section className="mb-12 sm:mb-20" id="about">
        <h2 className="mb-6">
          <span className="sr-only">About section</span>
          <AboutTypography className="w-20" />
        </h2>
        <p className="mb-2">
          I am a senior front-end engineer at{" "}
          <Button
            size="auto"
            variant="link"
            nativeButton={false}
            className="text-md"
            render={
              <Link href="https://www.golaunchlabs.com/" target="_blank">
                Launch Labs
                <ArrowUpRight className="size-2 transition-transform duration-100 ease-linear group-hover/button:translate-x-0.25 group-hover/button:-translate-y-0.25" />
              </Link>
            }
          />
          . Great software doesn&apos;t just work - it feels right. I dive into
          the weeds because that&apos;s where the magic hides - performance,
          accessibility, micro-interactions, the feel of a button. These details
          compound into something users instantly trust. When you obsess over
          these details, you develop an instinct - you just know when it&apos;s
          right.
        </p>
        <p className="mb-2">
          Since high school, I have spent years building software, learning and
          growing. You can get more details about my background through{" "}
          <Button
            size="auto"
            variant="link"
            nativeButton={false}
            className="text-md"
            render={
              <a href="#work-experience" aria-label="Work experience">
                work experience
              </a>
            }
          />
          .
        </p>
        <Button
          size="auto"
          variant="link"
          nativeButton={false}
          className="text-md"
          render={
            <Link
              target="_blank"
              href="https://t.me/okovaliukk"
              aria-label="Message me on Telegram"
            >
              message me on telegram
              <ArrowUpRight className="size-2 transition-transform duration-100 ease-linear group-hover/button:translate-x-0.25 group-hover/button:-translate-y-0.25" />
            </Link>
          }
        />{" "}
        ,{" "}
        <Button
          size="auto"
          variant="link"
          nativeButton={false}
          className="text-md"
          render={
            <Link
              target="_blank"
              aria-label="Check out my X"
              href="https://x.com/okovaliukk"
            >
              check out my x
              <ArrowUpRight className="size-2 transition-transform duration-100 ease-linear group-hover/button:translate-x-0.25 group-hover/button:-translate-y-0.25" />
            </Link>
          }
        />{" "}
        ,{" "}
        <Button
          size="auto"
          variant="link"
          nativeButton={false}
          className="text-md"
          render={
            <Link
              target="_blank"
              aria-label="Check out my Bluesky"
              href="https://bsky.app/profile/okovaliukk.bsky.social"
            >
              check out my bluesky
              <ArrowUpRight className="size-2 transition-transform duration-100 ease-linear group-hover/button:translate-x-0.25 group-hover/button:-translate-y-0.25" />
            </Link>
          }
        />{" "}
        ,{" "}
        <Button
          size="auto"
          variant="link"
          className="text-md"
          nativeButton={false}
          render={
            <Link
              target="_blank"
              aria-label="Connect with me on LinkedIn"
              href="https://www.linkedin.com/in/oleksandrkovaliuk/"
            >
              connect with me on linkedIn
              <ArrowUpRight className="size-2 transition-transform duration-100 ease-linear group-hover/button:translate-x-0.25 group-hover/button:-translate-y-0.25" />
            </Link>
          }
        />{" "}
        ,{" "}
        <Button
          size="auto"
          variant="link"
          nativeButton={false}
          className="text-md"
          render={
            <Link
              target="_blank"
              aria-label="See my work on GitHub"
              href="https://github.com/oleksandrkovaliuk"
            >
              see my work on github
              <ArrowUpRight className="size-2 transition-transform duration-100 ease-linear group-hover/button:translate-x-0.25 group-hover/button:-translate-y-0.25" />
            </Link>
          }
        />
      </section>

      <section id="work-experience" className="mb-12 sm:mb-20">
        <h2 className="mb-6">
          <span className="sr-only">Work experience</span>

          <WorkExpTypography className="h-9" />
        </h2>

        <ul>
          {workExperience.map((work) => (
            <li key={work.title}>
              <DialogToDrawer>
                <DialogToDrawerTrigger>
                  <Button
                    size="auto"
                    variant="clean"
                    className="text-md h-8 w-full min-w-0 justify-between gap-2 transition-transform active:scale-100"
                  >
                    <span className="inline-flex min-w-0 items-baseline gap-1">
                      {work.title}
                      <span className="text-muted-foreground min-w-0 text-sm wrap-anywhere">
                        {work.role}
                      </span>
                    </span>

                    <ArrowRight className="size-2 transition-transform group-hover/button:translate-x-0.5" />
                  </Button>
                </DialogToDrawerTrigger>

                <DialogToDrawerContent className="md:max-w-lg">
                  <DialogToDrawerHeader className="gap-0 px-6 pb-0">
                    <DialogToDrawerTitle className="text-lg font-bold">
                      {work.title}
                    </DialogToDrawerTitle>
                    <DialogToDrawerDescription>
                      {work.role}
                    </DialogToDrawerDescription>
                  </DialogToDrawerHeader>

                  <div className="pb-6">
                    <ScrollArea className="after:from-background before:from-background max-h-[60vh] space-y-2 px-6 text-base/relaxed text-pretty before:bg-gradient-to-b before:to-transparent after:bg-gradient-to-t after:to-transparent">
                      {work.summary}
                    </ScrollArea>
                  </div>
                </DialogToDrawerContent>
              </DialogToDrawer>
            </li>
          ))}
        </ul>
      </section>

      {/* @todo: add crafts section */}
      {/* <section id="crafts" className="mb-12 sm:mb-20">
        <h2 className="mb-6">
          <span className="sr-only">Crafts</span>
          <CraftsTypography className="h-8" />
        </h2>
      </section> */}

      <section id="inspiration" className="mb-12 sm:mb-20">
        <h2>
          <span className="sr-only">Inspiration</span>
          <InspirationTypography className="h-9.5" />
        </h2>

        <p className="text-muted-foreground mb-6 text-sm">
          People in tech who inspire me.
        </p>

        <ul className="inline-flex flex-wrap gap-x-1">
          {inspiration.map((person, index) => (
            <li key={person.name}>
              <Button
                size="auto"
                variant="link"
                nativeButton={false}
                className="text-md"
                render={
                  <Link
                    target="_blank"
                    href={person.link}
                    aria-label={`Visit ${person.name}'s website`}
                  >
                    {person.name}
                    <ArrowUpRight className="size-2 transition-transform duration-100 ease-linear group-hover/button:translate-x-0.25 group-hover/button:-translate-y-0.25" />
                  </Link>
                }
              />{" "}
              {index < inspiration.length - 1 && ","}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

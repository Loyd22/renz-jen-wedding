import { EntourageGroup } from "@/components/shared/entourage-group";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { additionalBearersConfig, entourageConfig, secondarySponsorsConfig } from "@/config/entourage.config";

export function EntourageSection() {
  const [groomParents, brideParents, officiant, sponsors, bestMan, matron, maidOfHonor, groomsmen, bridesmaids, ringBearer] = entourageConfig;
  const [bibleBearer, coinBearer] = additionalBearersConfig;

  return (
    <section
      id="entourage"
      className="scroll-mt-16 bg-white py-20 sm:py-28"
    >
      <SectionContainer>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading title="ENTOURAGE" />

          <div className="mx-auto mt-12 grid max-w-lg grid-cols-2 gap-2 sm:mt-16 sm:gap-4">
            <EntourageGroup {...groomParents} />
            <EntourageGroup {...brideParents} />
          </div>

          <div className="mt-8 sm:mt-10">
            <EntourageGroup {...officiant} />
          </div>

          <div className="mt-10 sm:mt-12">
            <EntourageGroup {...sponsors} />
          </div>

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 gap-2 sm:mt-20 sm:gap-4">
            <EntourageGroup {...maidOfHonor} />
            <EntourageGroup {...matron} />
          </div>

          <div className="mt-12 sm:mt-16">
            <EntourageGroup {...bestMan} />
          </div>

          <div className="mx-auto mt-12 grid max-w-lg grid-cols-2 gap-2 sm:mt-16 sm:gap-4">
            <EntourageGroup {...groomsmen} />
            <EntourageGroup {...bridesmaids} />
          </div>

          <div className="mt-14 sm:mt-16">
            <h3 className="font-[family-name:var(--font-serif)] text-lg font-medium uppercase leading-tight text-[var(--color-dark-olive)] sm:text-xl">
              Secondary Sponsors
            </h3>
            <div className="mt-8 space-y-8">
              {secondarySponsorsConfig.map((group) => (
                <EntourageGroup key={group.category} {...group} />
              ))}
            </div>
          </div>

          <div className="mt-14 sm:mt-16">
            <h3 className="font-[family-name:var(--font-serif)] text-lg font-medium uppercase leading-tight text-[var(--color-dark-olive)] sm:text-xl">
              Ceremonial Bearers
            </h3>
            <div className="mt-8 space-y-8">
              <EntourageGroup {...coinBearer} />
              <EntourageGroup {...bibleBearer} />
              <EntourageGroup {...ringBearer} />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

import { EntourageGroup } from "@/components/shared/entourage-group";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { entourageConfig } from "@/config/entourage.config";

export function EntourageSection() {
  const [groomParents, brideParents, officiant, sponsors, bestMan, matron, bridesMan, ringBearer] = entourageConfig;

  return (
    <section
      id="entourage"
      className="scroll-mt-16 bg-white py-20 sm:py-28"
    >
      <SectionContainer>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading title="The Entourage" />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-12">
            <EntourageGroup {...groomParents} />
            <EntourageGroup {...brideParents} />
          </div>

          <div className="mt-8 sm:mt-10">
            <EntourageGroup {...officiant} />
          </div>

          <div className="mt-10 sm:mt-12">
            <EntourageGroup {...sponsors} />
          </div>

          <div className="mt-16 grid grid-cols-3 gap-2 sm:mt-20 sm:gap-6">
            <EntourageGroup {...bestMan} />
            <EntourageGroup {...matron} />
            <EntourageGroup {...bridesMan} />
          </div>

          <div className="mt-14 sm:mt-16">
            <EntourageGroup {...ringBearer} />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

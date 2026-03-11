import MomCFOSlide from "@/components/MomCFOSlide";

const Index = () => {
  // July 1 = day 182, target $340k, 10% ahead at halftime
  // Expected at halftime: $340k * 0.4986 ≈ $169.5k
  // 10% ahead of expected: ~$186.5k
  const expectedAtHalftime = 340000 * (182 / 365);
  const currentRevenue = Math.round(expectedAtHalftime * 1.1);

  return (
    <MomCFOSlide
      targetRevenue={340000}
      currentRevenue={currentRevenue}
      dayOfYear={182}
      totalDays={365}
    />
  );
};

export default Index;

import faker from "@faker-js/faker";

export function recommendationFactory() {
  const musicFactory = {
    id: 1,
    name: faker.lorem.sentence(2),
    youtubeLink: "https://www.youtube.com/watch?v=pnKNMa12ggQ",
    score: 0,
  };

  return musicFactory;
}

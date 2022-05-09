import { faker } from "@faker-js/faker";

export default function recommendationBodyFactory() {
  const music = {
    name: faker.lorem.sentence(2),
    youtubeLink: "https://www.youtube.com/watch?v=pnKNMa12ggQ",
  };
  return music;
}

import seedrandom from "seedrandom"
import { Faker, en, de, ja } from "@faker-js/faker"

const LOCALES = {
  en_US: en,
  de_DE: de,
  ja_JP: ja,
}

const GENRES = ["Fiction", "Science", "Romance", "Thriller", "Fantasy", "History"]

export function generateBooks({ seed, page, region, likes, reviews }) {
  const localeData = LOCALES[region] || en
  const books = []

  const baseSeed = `${seed}-${page}`
  const rng = seedrandom(baseSeed)

  for (let i = 0; i < 20; i++) {
    const index = (page - 1) * 20 + i + 1
    const bookSeed = `${baseSeed}-${i}`
    const bookRng = seedrandom(bookSeed)

    const faker = new Faker({
      locale: [localeData],
      random: bookRng,
    })

    // ISBN 10 belgidan iborat katta harf va raqamlar
    const isbn = faker.string.alphanumeric(10).toUpperCase()

    // Title - 3 so‘zdan iborat so‘zlar (locale ga mos)
    const title = faker.lorem.words(3)

    // Mualliflar - 2 ta to‘liq ism (locale ga mos)
    const authors = [faker.name.fullName(), faker.name.fullName()]

    // Nashriyot
    const publisher = faker.company.name()

    // Mamlakat (locale ga mos)
    const country = faker.location.country()

    // Janr
    const genre = faker.helpers.arrayElement(GENRES)

    // Language qisqartmasi, masalan "en" "de"
    const language = region.split("_")[0]

    // Likes va reviews sonini fractional probabilistik hisoblash
    const bookLikes = generateFractionalAmount(likes, rng)
    const reviewCount = generateFractionalAmount(reviews, rng)

    // Sharhlar ro‘yxati, har biri muallif va text bilan
    const reviewsArr = Array.from({ length: reviewCount }, (_, idx) => {
      const reviewSeed = `${bookSeed}-review-${idx}`
      const reviewRng = seedrandom(reviewSeed)
      const reviewFaker = new Faker({
        locale: [localeData],
        random: reviewRng,
      })

      return {
        author: reviewFaker.name.fullName(),
        text: reviewFaker.lorem.sentences(2),
      }
    })

    books.push({
      index,
      isbn,
      title,
      authors,
      publisher,
      country,
      genre,
      language,
      likes: bookLikes,
      reviews: reviewsArr,
    })
  }

  return books
}

function generateFractionalAmount(n, rng) {
  const whole = Math.floor(n)
  const fraction = n % 1
  const extra = rng() < fraction ? 1 : 0
  return whole + extra
}

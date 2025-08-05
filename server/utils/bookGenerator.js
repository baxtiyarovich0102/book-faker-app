import seedrandom from "seedrandom"
import { Faker, en, de, ja } from "@faker-js/faker"

// region -> locale mapping
const LOCALES = {
  en_US: en,
  de_DE: de,
  ja_JP: ja,
}

export function generateBooks({ seed, page, region, likes, reviews }) {
  const localeData = LOCALES[region] || en

  const books = []
  const baseSeed = seed + "-" + page
  const rng = seedrandom(baseSeed)

  for (let i = 0; i < 20; i++) {
    const index = (page - 1) * 10 + i + 1

    // har bir kitob uchun alohida seed hosil qilamiz
    const bookSeed = `${baseSeed}-${i}`
    const bookRng = seedrandom(bookSeed)

    const faker = new Faker({
      locale: [localeData],
      // har bir faker uchun random source — seedrandom orqali
      random: bookRng,
    })

    const isbn = faker.string.alphanumeric(10).toUpperCase()
    const title = faker.lorem.words(3)
    const authors = [faker.person.fullName(), faker.person.fullName()]
    const publisher = faker.company.name()

    const bookLikes = generateFractionalAmount(likes, rng)
    const reviewCount = generateFractionalAmount(reviews, rng)

    const reviewsArr = Array.from({ length: reviewCount }, () => ({
      author: faker.person.fullName(),
      text: faker.lorem.sentences(2),
    }))

    books.push({
      index,
      isbn,
      title,
      authors,
      publisher,
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

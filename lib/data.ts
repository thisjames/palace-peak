export type Year = {
  year: string
  brands: string[]
  fictionalBrands?: string[]
  projects?: string[]
  videos?: string[]
  fictional?: boolean
}

export const YEARS: Year[] = [
  { year: "2011", brands: [], videos: ["Palace Promo"] },
  { year: "2012", brands: ["Umbro", "Tate Britain"], videos: ["This Time Tomorrow"] },
  { year: "2013", brands: ["Reebok"], videos: ["Gorgeous"] },
  { year: "2014", brands: ["adidas Originals", "Bronze 56k"] },
  { year: "2015", brands: ["adidas", "Bronze 56k"] },
  { year: "2016", brands: ["adidas", "Reebok"], videos: ["V Nice"] },
  { year: "2017", brands: ["adidas"], projects: ["Mwadlands"], videos: ["Palasonic"] },
  { year: "2018", brands: ["adidas", "Reebok", "Ralph Lauren", "Kickers"], videos: ["Paramount"] },
  { year: "2019", brands: ["adidas", "Reebok", "Kickers", "Rapha"] },
  { year: "2020", brands: ["adidas", "Reebok", "Salomon", "Arc'teryx", "Rapha", "Juventus FC"] },
  { year: "2021", brands: ["adidas", "Moschino", "Stella Artois", "Elton John", "Calvin Klein"] },
  { year: "2022", brands: ["adidas", "Gucci", "Mercedes-AMG", "Engineered Garments", "Vans"] },
  { year: "2023", brands: ["adidas", "Kappa x Alpine", "C.P. Company", "UGG", "Nanamica", "Barbour", "Wedgwood"] },
  { year: "2024", brands: ["adidas", "Reebok", "Umbro", "Thrasher", "Gap", "Evisu", "Vivienne Westwood", "Berghaus", "Oakley", "Carhartt WIP", "Needles", "UGG"] },
  { year: "2025", brands: ["Nike", "New Balance", "adidas", "Engineered Garments", "C.P. Company", "Dr. Martens", "Maharishi", "Fred Perry", "Barbour", "The North Face", "UGG", "Fender"], projects: ["Manor Place"], videos: ["Videodaze"] },
  { year: "2026", brands: ["Nike", "Schott", "World Industries"], fictionalBrands: ["Pepe Jeans", "Smeg", "Brompton"] },
  { year: "2027", brands: ["Lucozade", "Harry Potter", "Guinness", "Speedo", "Route One"], fictional: true },
  { year: "2028", brands: ["Beatrix Potter", "Greggs", "BlackRock", "Ryanair", "Coronation of King William V"], fictional: true },
  { year: "2029", brands: ["Wetherspoons", "Microsoft", "Tesla", "Tony Hawk Foundation", "Luton Airport"], fictional: true },
  { year: "2030", brands: ["IKEA", "NASA", "GCHQ", "HMRC"], fictional: true },
]

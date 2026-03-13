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
  { year: "2014", brands: ["adidas Originals", "Bronze 56k"], videos: ["Endless Bummer"] },
  { year: "2015", brands: ["adidas", "Bronze 56k"] },
  { year: "2016", brands: ["adidas", "Reebok"], videos: ["V Nice"] },
  { year: "2017", brands: ["adidas", "Cîroc"], projects: ["Mwadlands"], videos: ["Palasonic", "The Merchandise"] },
  { year: "2018", brands: ["adidas", "Reebok", "Ralph Lauren", "Kickers"], videos: ["Betamaximum", "Paramount"] },
  { year: "2019", brands: ["adidas", "Reebok", "Kickers", "Rapha"], videos: ["Deeper Understanding"] },
  { year: "2020", brands: ["adidas", "Reebok", "Salomon", "Arc'teryx", "Rapha", "Juventus FC", "Whitney Houston", "Happy Mondays", "NHS", "Anarchic Adjustment", "Winmau"] },
  { year: "2021", brands: ["adidas", "Moschino", "Stella Artois", "Alice Cooper", "Elton John", "Calvin Klein", "Cannondale", "Harrods", "Tricker's", "Pez", "M-Zone", "Lotties", "Slap Magazine", "CTMY"], videos: ["Beyond the 3rd Wave"] },
  { year: "2022", brands: ["adidas", "Gucci", "Mercedes-AMG", "Engineered Garments", "Elton John", "Vans", "Detroit Tigers", "Brixton's Baddest", "Y-3", "Aesthetics", "Need for Speed", "Apple Music", "Starter"] },
  { year: "2023", brands: ["adidas", "Kappa x Alpine F1", "C.P. Company", "UGG", "Spitfire", "Nanamica", "Barbour", "Wedgwood", "Rimowa", "Porter", "Champion", "Droors", "McDonald's"], videos: ["Beta Blockers"] },
  { year: "2024", brands: ["adidas", "Reebok", "Umbro", "Thrasher", "Gap", "Evisu", "Stella Artois", "Beams+", "Porter", "Vivienne Westwood", "Berghaus", "Oakley", "Carhartt WIP", "Needles", "UGG", "Avirex", "Rapha", "Brompton", "The Great Frog", "Crocs"] },
  { year: "2025", brands: ["Nike", "New Balance", "adidas", "Engineered Garments", "C.P. Company", "Dr. Martens", "Death Note", "Maharishi", "Sci-Fi Fantasy", "HIM", "Neighborhood", "Fred Perry", "Barbour", "The North Face Purple Label", "UGG", "Fender", "Moon Boot", "JCC+"], projects: ["Manor Place"], videos: ["Videodaze"] },
  { year: "2026", brands: ["Nike", "San Francisco Giants", "Schott", "World Industries"], fictionalBrands: ["Pepe Jeans", "Smeg", "Trisha's Soho"] },
  { year: "2027", brands: ["Harry Potter", "Lucozade", "The Hurlingham Club", "Speedo", "Argos"], fictional: true },
  { year: "2028", brands: ["Beatrix Potter", "Greggs", "BlackRock", "Ryanair", "Coronation of King William V"], fictional: true },
  { year: "2029", brands: ["Wetherspoons", "Microsoft", "Tesla", "Tony Hawk Foundation", "Luton Airport"], fictional: true },
  { year: "2030", brands: ["Principality of Liechtenstein", "HMRC"], fictional: true },
]
